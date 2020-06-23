import React, { Component } from 'react'
import axios from 'axios';
const STATUS = Object.freeze({
    WAITING: 0,
    PROCESSING: 1,
    CLOSED: 2,
    BUSY: 3,
});
export default class WaitingInterviewer extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            ticketId: this.props.match.params.id,
            statusTicket: STATUS.WAITING,
        }
    }

    componentDidMount(){
        axios
        .get('http://localhost:5000/interviewSessions/getProcessingTicketId')
        // .get('/interviewSessions/getProcessingTicketId')
        .then(response => {
            const processingTicketId = response.data;
            console.log("processingTicketId ", processingTicketId);
            if(processingTicketId){
                if(processingTicketId == this.state.ticketId ){
                    this.setState({
                        statusTicket: STATUS.PROCESSING
                    })
                } else {
                    this.setState({
                        statusTicket: STATUS.BUSY
                    })
                }
            } else {
                this.setState({
                    statusTicket: STATUS.WAITING
                })
            }
        })

    }

    getStatusTicket(){
        let statusString = "";
        switch (this.state.statusTicket) {
            case STATUS.WAITING:
                statusString = "Please waiting...";
                break;
            case STATUS.PROCESSING:
                statusString = "Ticket is processing...";
                break;
            case STATUS.BUSY:
                    statusString = "Interview room is busy...";
                    break;
            default:
                statusString = "Ticket is closed";
                break;
        }
        return (
            <p>{statusString}</p>
        )
    }

    render() {
        return (
            <div>
                <h3>Ticket id is {this.state.ticketId}</h3>
                {this.getStatusTicket()}
            </div>
        )
    }
}
