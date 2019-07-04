import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { baseUrl, createDefaultMethod } from '../../constants'

const defaultConfigDelete = createDefaultMethod('DELETE')
const defaultConfigCreate = createDefaultMethod('POST')

class Container extends React.Component {
  state = {
    attendance: {},
    students: [],
    groups: [],
    error: null,
  }

  addData = async ({model, config = defaultConfigCreate}, data) => {
    const {
      name,
      lastname,
      date,
    } = data

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
    this.setState({attendance: {}, error: null})
  }

  deleteData = async ({model, config = defaultConfigDelete}, e, index, date) => {
    const response = await fetch(`${baseUrl}/${model}/${index}`, {...config})

    if (response.ok) {
      this.setState(state => {
        const students = state.attendance[date].filter(e => e.id !== index)
        const attendance = {
          ...state.attendance,
          [date]: students,
        }

        if (students.length === 0) {
          delete(attendance[date])
        }

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

      // Construct an Object from the response (Array)
      // Key the date of the attendance; Value the Array with the students
      if (!Array.isArray(this.state[model])) {
        const mod = {}

        data.forEach(item => {
          const items = mod[item.date]

          if (!Array.isArray(items)) {
            mod[item.date] = [item]
            return
          }

          mod[item.date].push(item)
        })

        this.setState({[model]: mod, error: null})

        return
      }

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
