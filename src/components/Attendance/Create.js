import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { navigate } from '@reach/router'

import Card from './Card'
import { baseUrl } from '../../constants'

class Create extends React.Component {
  state = {
    date: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/'),
    groups: [],
    students: [],
  }

  async componentDidMount() {
    const r = await fetch(`${baseUrl}/students`)
    const students = await r.json()

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

          return (
            <Col key={student.id} xs={12} sm={6} md={4} lg={3}>
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
    const { date } = this.state

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
