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

  const { attendance, attendance: { constructor }, deleteData } = props

  return (
    Object.keys(attendance).length === 0 && constructor === Object
    ? 'La lista de asistencia está vacía'
    : <Table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        { renderList(attendance, deleteData) }
      </Table>
  )
}

const renderList = (obj, deleteData) => {
  const table = []

  for(const prop in obj) {
    const row = obj[prop].map((element, index) => {
      let first
      let className = 'Date Large'
      const { length } = obj[prop]

      if (length < 3) {
        className = className.split(' ').splice(0, 1).concat('Small').join(' ')
      }

      if (index === 0) {
        first = (
          <td className={className} rowSpan={obj[prop].length}>
            { prop }
          </td>
        )
      }

      return (
        <tr key={index}>
          { first }
          <td className="List">
            <img src={`https://api.adorable.io/avatars/50/${element.student.name}${element.student.lastname}.png`} alt={`${element.student.name} ${element.student.lastname}`}/>
          </td>
          <td>{element.student.name}</td>
          <td>{element.student.lastname}</td>
          <td>
            <Button variant='light' onClick={e => deleteData({model: 'attendance'}, e, element.id, element.date)}>
              Borrar
            </Button>
          </td>
        </tr>
      )
    })

    table.push(<tbody key={table.length}>{row}</tbody>)
  }

  return table
}

export default List
