import React, { Component } from 'react'
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
        <td>
            <a href="skype:live:.cid.638a6d3ee509bd04" onClick= {() => { props.processTicket(props.ticket._id) }} >Call</a>
        </td>
    </tr>
)

export default class TicketList extends Component {    

    constructor(props){

        super(props);

        this.processTicket = this.processTicket.bind(this);

        this.state = {tickets: []};

    }

    componentDidMount(){
        axios.get('http://localhost:5000/tickets/today')
            .then(response => {
                this.setState({tickets: response.data})                
            })
            .catch(error => {
                console.log(error);
            })
    }

    processTicket(id){
        // console.log("process ticket ", `http:localhost:5000/tickets/${id}`)
        const urlRequestDeleteTicket = 'http://localhost:5000/tickets/'+id;
        const urlRequestNewInterviewSession = 'http://localhost:5000/interviewSessions/add';
        console.log('url ', urlRequestDeleteTicket);
        console.log('url ', urlRequestNewInterviewSession);
        const ticketInfo = { ticketId: id};
        axios.post(urlRequestNewInterviewSession, ticketInfo)
            .then( () => {
                axios.delete(urlRequestDeleteTicket)
                    .then(res => console.log(res.data))
                    .catch(err => console.log('delete ticket failed ', err));
            })
            .catch(err => console.log('Request new interview session failed', err));
        
        this.setState({
            tickets: this.state.tickets.filter(ticket => ticket._id !== id)
        });
    }

    ticketList(){
        return this.state.tickets.map(currentTicket => {
            return <Ticket
                        ticket={currentTicket}
                        key={currentTicket._id}
                        processTicket={this.processTicket}
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
                            <th>Action</th>
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
