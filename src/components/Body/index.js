import React from 'react'
import Col from 'react-bootstrap/Col'
import { Router, Redirect } from '@reach/router'
import Row from 'react-bootstrap/Row'

import {
  Create as CreateAttendance,
  List as ListAttendance
} from '../Attendance'

const Body = props => (
  <Row>
    <Col xs={12}>
      <Router>
        <Redirect from='/' to='/attendance' />
        <CreateAttendance path='/attendance/create' />
        <ListAttendance path='/attendance' />
      </Router>
    </Col>
  </Row>
)

export default Body
