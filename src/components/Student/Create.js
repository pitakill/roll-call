import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { navigate } from '@reach/router'

import { createDefaultMethod, throttle, throttleTime } from '../../constants'

const config = createDefaultMethod('POST')

class Create extends React.Component {
  state = {
    name: '',
    lastname: '',
    group: '',
    message: '',
    variant: '',
    groups: [],
  }

  async componentDidMount() {
    try {
      const response = await this.props.handleData({model: 'groups'})
      const groups = await response.json()
      this.setState({groups})
    } catch (e) {
      console.error(e)
    }
  }

  handleChange = e => {
    const {id, value} = e.target

    this.setState({[id]: value})
  }

  handleDismiss = () => {
    this.setState({variant: '', message: ''})
  }

  handleSubmit = async e => {
    e.preventDefault()

    const {
      name,
      lastname,
      group,
    } = this.state

    const groupId = parseInt(group, 10)

    if (!name || !lastname || !groupId || groupId === 0) {
      this.setState({variant: 'info', message: 'Llena todos los campos'})
      return
    }

    const response = await this.props.handleData(
      {model: 'students', config},
      {name, lastname, groupId}
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
    const { name, lastname } = this.state

    return (
      <Row>
        <Col xs={12} sm={4} className="text-center">
          {
            name && lastname
            ? <img src={`https://api.adorable.io/avatars/200/${name}${lastname}.png`} alt={`${name} ${lastname}`}/>
            : null
          }
        </Col>
        <Col xs={12} sm={8}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Juan"
                onChange={e => throttle(this.handleChange(e), throttleTime)}
                value={this.state.name}
              />
            </Form.Group>

            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pérez"
                onChange={e => throttle(this.handleChange(e), throttleTime)}
                value={this.state.lastname}
              />
            </Form.Group>

            <Form.Group controlId="group">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleChange}
                value={this.state.group}
              >
                <option value='0'>Elige un grupo</option>
                {
                  this.state.groups.map(group => (
                    <option key={group.code} value={group.id}>{group.code}</option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Alert
            className="alert-create"
            dismissible
            variant={this.state.variant}
            onClose={this.handleDismiss}
            show={this.state.variant}
            >
            {this.state.message}
          </Alert>
        </Col>
      </Row>
    )
  }
}

export default Create
