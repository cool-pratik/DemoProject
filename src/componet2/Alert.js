import React, { Component } from 'react'

export default class Alert extends Component {


    render() {
        return (
            <div >
                {this.props.alert &&
                    <div className={`alert alert-${this.props.alert.type} fixed-top text-center`} style={{ marginTop: "70px", height: '60px' }} role="alert">
                        {this.props.alert.message}
                    </div>
                }

            </div>
        )
    }
}
