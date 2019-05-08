import React from 'react'
import Col from 'react-bootstrap/Col'
import { Router, Redirect } from '@reach/router'
import Row from 'react-bootstrap/Row'

import {
  Container as ContainerAttendance,
  Create as CreateAttendance,
  List as ListAttendance,
} from '../Attendance'
import {
  Container as ContainerStudent,
  Create as CreateStudent,
  //List as ListStudent,
} from '../Student'

const Home = props => (
  <Row>
    <Col xs={12}>
      <Router>
        <Redirect from='/' to='/attendance' />
        <ContainerAttendance
          path='/attendance/create'
          component={CreateAttendance}
        />
        <ContainerAttendance
          path='/attendance'
          component={ListAttendance}
        />
        <ContainerStudent
          path='/student/create'
          component={CreateStudent}
        />
      </Router>
    </Col>
  </Row>
)

export default Home
