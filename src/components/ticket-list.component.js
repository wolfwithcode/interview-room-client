import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function calWaitingMinute(timeIn){
    const now = new Date();
    const timeInDate = new Date(timeIn);
    const diff = (now.getTime() - timeInDate.getTime())/60000;

    return Math.round(diff);
}

const Ticket = props => (
    <tr>
        <td>{props.ticket.username}</td>
        <td>{props.ticket.description}</td>
        <td>{props.ticket.skypeId}</td>
        <td>Open</td>
        <td>{calWaitingMinute(props.ticket.timeIn)}</td>
    </tr>
)

export default class TicketList extends Component {    

    constructor(props){

        super(props);

        this.state = {tickets: []};

    }

    componentDidMount(){
        axios.get('http://localhost:5000/tickets')
            .then(response => {
                this.setState({tickets: response.data})                
            })
            .catch(error => {
                console.log(error);
            })
    }

    ticketList(){
        return this.state.tickets.map(currentTicket => {
            return <Ticket
                        ticket={currentTicket}
                        key={currentTicket._id}
                    />;
        })
    }
    render() {
        return (
            <div>
                <h3>Ticket Dash board</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Skype Id</th>
                            <th>Status</th>
                            <th>Waiting minute</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ticketList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
