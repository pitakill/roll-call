import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import moment from 'moment'
import 'moment/locale/es'

import './Create.css'
import Card from './Card'
import { baseUrl } from '../../constants'


class Create extends React.Component {
  state = {
    today: moment().locale('es').format('LL'),
    groups: [],
    students: [],
  }

  async componentDidMount() {
    let url = `${baseUrl}/students`

    const params = ['attendance']

    url += '?'
    url += params.map(param => `_embed=${param}`).join('&')

    const res = await fetch(url)
    const students = await res.json()

    const rs = await fetch(`${baseUrl}/groups`)
    const groups = await rs.json()

    this.setState({groups, students})
  }

  displayInfo() {
    return this.state.groups.map(group => (
      <Row key={group.code}>
      <Col xs={12}>
        <h2 className="text-center">{group.code}</h2>
      </Col>
      {
        this.state.students.map((student, id) => {
          if (student.groupId !== group.id) {
            return null
          }

          if (Array.isArray(student.attendance)) {
            if (student.attendance.find(m => m.date === this.state.today)) {
              return null
            }
          }

          return (
            <Col key={student.id} xs={12} sm={6} md={4} lg={3} className='Card-wrapper text-center'>
              <Card {...student} position={id} handleSubmit={this.handleSubmit}/>
            </Col>
          )
        })
      }
      </Row>
    ))
  }

  handleSubmit = async (e, data) => {
    this.setState({loading: true})

    const { name, lastname, position } = data
    const { today: date } = this.state

    const response = await this.props.addData(
      {model: 'attendance'},
      {name, lastname, date}
    )

    if (!response.ok) {
      this.setState({variant: 'danger', message: 'Datos no guardados'})
      return
    }

    this.setState(
      {variant: 'success', message: 'Datos guardados'},
      () => setTimeout(() => this.setState((prevState, props) => {
        return {
          students: prevState.students.filter((e, i) => !(i === position))
        }
      }), 300)
    )
  }

  render() {
    return <> { this.displayInfo () } </>
  }
}

export default Create
