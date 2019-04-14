import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { navigate } from '@reach/router'

import './Create.css'

class Create extends React.Component {
  state = {
    name: '',
    lastname: '',
    date: '',
    message: '',
    variant: '',
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
      date,
    } = this.state

    if (!name || !lastname || !date) {
      this.setState({variant: 'info', message: 'Llena todos los campos'})

      return
    }

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
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Juan"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pérez"
              onChange={this.handleChange}
              value={this.state.lastname}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="text"
              placeholder="2019/03/29"
              onChange={this.handleChange}
              value={this.state.date}
            />
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
      </>
    )
  }
}

export default Create
