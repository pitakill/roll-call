import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { navigate } from '@reach/router'
import moment from 'moment'

import './Create.css'
import Card from './Card'
import { baseUrl } from '../../constants'

class Create extends React.Component {
  state = {
    today: moment().format('YYYY/MM/DD'),
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
        this.state.students.map(student => {
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
              <Card {...student} handleSubmit={this.handleSubmit}/>
            </Col>
          )
        })
      }
      </Row>
    ))
  }

  handleSubmit = async (e, data) => {
    this.setState({loading: true})

    const { name, lastname } = data
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
      () => setTimeout(() => navigate('/attendance'), 1500)
    )
  }

  render() {
    return <> { this.displayInfo () } </>
  }
}

export default Create
