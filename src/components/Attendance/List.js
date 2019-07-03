import React from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import './List.css'

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
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          props.attendance.map((element, index) => (
            <tr key={index}>
              <th className="List">
                <img src={`https://api.adorable.io/avatars/50/${element.student.name}${element.student.lastname}.png`} alt={`${element.student.name} ${element.student.lastname}`}/>
              </th>
              <th>{element.student.name}</th>
              <th>{element.student.lastname}</th>
              <th>{element.date}</th>
              <th>
                <Button variant='light' onClick={e => props.deleteData({model: 'attendance'}, e, element.id)}>
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
