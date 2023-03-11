import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class Footer extends Component {
  render() {
    return (
     
      <div style={{ marginTop: "250px" }}>
      <Card className="text-center fixed-bottom bg-dark" >                
          <Card.Footer className="text-muted "><p>@ RaysTechnology  Copyright: 2022-23 Raystech Pvt.ltd ... by Harish Hamad</p> </Card.Footer>
      </Card>
</div>
     
    )
  }
}
