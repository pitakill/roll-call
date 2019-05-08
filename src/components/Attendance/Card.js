import React from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class Card extends React.Component {
  state = {
    loading: false
  }

  handleSubmit(e, data) {
    this.setState({loading: true})
    this.props.handleSubmit(e, data)
  }

  displayButton = (data) => {
    return this.state.loading
      ?   <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
      : <Button onClick={e => this.handleSubmit(e, data)}>Add attendance</Button>
  }

  render() {
    const { name, lastname } = this.props
    return (
      <>
        <img src={`https://api.adorable.io/avatars/250/${name}${lastname}.png`} alt={`${name} ${lastname}`}/>
        <span>{name}</span>
        { ' ' }
        <span>{lastname}</span>
        <br />
        { this.displayButton({name, lastname}) }
      </>
    )
  }
}

export default Card
