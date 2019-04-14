import React from 'react'
import Table from 'react-bootstrap/Table'

const List = props => {
  React.useEffect(() => {
    props.getData({
      model: 'attendance',
      params: ['group', 'student'],
    })

    return props.clearData
  }, [])

  return (
    props.attendance.length === 0
    ? 'La lista de asistencia está vacía'
    : <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {
          props.attendance.map((element, index) => (
            <tr key={index}>
              <th>{element.student.name}</th>
              <th>{element.student.lastname}</th>
              <th>{element.date}</th>
            </tr>
          ))
        }
        </tbody>
      </Table>
  )
}

export default List
