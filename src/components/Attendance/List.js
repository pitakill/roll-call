import React from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const List = props => {
  const model = 'attendance'

  React.useEffect(() => {
    props.getData({
      model,
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
              <th>
                <Button variant='light' onClick={e => props.deleteData({model}, e, element.id)}>
                  Borrar
                </Button>
              </th>
            </tr>
          ))
        }
        </tbody>
      </Table>
  )
}

export default List
