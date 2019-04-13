import React from 'react'
import Col from 'react-bootstrap/Col'
import { Link } from '@reach/router'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'

import './styles.css'

const Header = props => (
  <Row>
    <Col xs={12}>
      <Nav className="main-nav">
        <Nav.Item>
          <Link to='/attendance'>Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to='/attendance/create'>Add Attendance</Link>
        </Nav.Item>
      </Nav>
    </Col>
  </Row>
)

export default Header
