import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const baseUrl = 'http://localhost:4000'
const defaultConfigCreate = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}
const defaultConfigDelete = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}
const dateRegex = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/

class Container extends React.Component {
  state = {
    attendance: [],
    error: null
  }

  addData = async ({model, config = defaultConfigCreate}, data) => {
    const {
      name,
      lastname,
      date,
    } = data

    if (!dateRegex.test(date)) return 'Fecha no válida'

    // Hardcoded because there is only one group
    const groupId = 1
    let studentId

    const studentsByLastnameRaw = await fetch(`${baseUrl}/students?q=${lastname}`)
    const studentsByLastname = await studentsByLastnameRaw.json()

    const studentsByNameRaw = await fetch(`${baseUrl}/students?q=${name}`)
    const studentsByName = await studentsByNameRaw.json()

    if (studentsByLastname.length && studentsByName.length) {
      // We only search in the first element of the name's array
      const student = studentsByLastname.find(student => student.name === studentsByName[0].name)

      studentId = student ? student.id : null
    }

    if (studentId) {
      const body = {
        studentId,
        groupId,
        date,
      }

      return fetch(`${baseUrl}/${model}`, {
        ...config,
        body: JSON.stringify(body),
      })
    }

    const studentRaw = await fetch(`${baseUrl}/students`, {
      ...config,
      body: JSON.stringify({
        name,
        lastname,
        groupId,
      })
    })
    const student = await studentRaw.json()

  const body = {
      studentId: student.id,
      groupId,
      date,
    }

    return fetch(`${baseUrl}/${model}`, {
      ...config,
      body: JSON.stringify(body),
    })
  }

  clearData = () => {
    this.setState({attendance: [], error: null})
  }

  deleteData = async ({model, config = defaultConfigDelete}, e, index) => {
    const response = await fetch(`${baseUrl}/${model}/${index}`, {...config})

    if (response.ok) {
      this.setState(state => {
        const attendance = state.attendance.filter(e => e.id !== index)

        return {
          ...state,
          attendance,
        }
      })
    }
  }

  getData = async ({model, params}, config) => {
    try {
      let url = model

      if (params) {
        url += '?'
        url += params.map(param => `_expand=${param}`).join('&')
      }

      const dataRaw = await fetch(`${baseUrl}/${url}`, config)
      const data = await dataRaw.json()

      this.setState({[model]: data, error: null})
    } catch (error) {
      this.setState({error})
    }
  }

  render() {
    const componentProps = {
      ...this.state,
      addData: this.addData,
      clearData: this.clearData,
      deleteData: this.deleteData,
      getData: this.getData,
    }

    const Component = this.props.component

    return (
      <Row>
        <Col xs={12} >
          <Component {...componentProps} />
        </Col>
      </Row>
    )
  }
}

export default Container
