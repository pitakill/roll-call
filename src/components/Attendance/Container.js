import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const baseUrl = 'http://localhost:4000'
const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

class Container extends React.Component {
  state = {
    attendance: [],
    error: null
  }

  addData = ({model, config = defaultConfig}, data) => {
    return fetch(`${baseUrl}/${model}`, {
      ...config,
      body: JSON.stringify(data),
    })
  }

  clearData = () => {
    this.setState({attendance: [], error: null})
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
