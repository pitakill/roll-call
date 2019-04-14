import React from 'react'
import Col from 'react-bootstrap/Col'
import { Router, Redirect } from '@reach/router'
import Row from 'react-bootstrap/Row'

import {
  Container as ContainerAttendance,
  Create,
  List
} from '../Attendance'

const Body = props => (
  <Row>
    <Col xs={12}>
      <Router>
        <Redirect from='/' to='/attendance' />
        <ContainerAttendance
          path='/attendance/create'
          component={Create}
        />
        <ContainerAttendance
          path='/attendance'
          component={List}
        />
      </Router>
    </Col>
  </Row>
)

export default Body
