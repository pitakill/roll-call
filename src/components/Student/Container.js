import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { baseUrl } from '../../constants'

class Container extends React.Component {
  handleData = ({model, config}, data) => {
    const configuration = config ? {
      ...config,
      body: JSON.stringify(data),
    } : null

    return fetch(`${baseUrl}/${model}`, configuration)
  }

  render() {
    const componentProps = {
      ...this.state,
      handleData: this.handleData,
    }

    const Component = this.props.component

    return (
      <Row>
        <Col xs={11}>
          <Component {...componentProps} />
        </Col>
      </Row>
    )
  }
}

export default Container
