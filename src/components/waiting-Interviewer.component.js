import React, { Component } from 'react'
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
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
            
            if(processingTicketId == this.state.ticketId ){
                this.setState({
                    statusTicket: STATUS.PROCESSING
                })
            } else {
                axios
                    .get('http://localhost:5000/tickets/getStatusTicket/' + this.state.ticketId )
                    .then(response => {
                        const status = response.data.status;
                        if(status == "closed"){
                            this.setState({
                                statusTicket: STATUS.CLOSED
                            })
                        } else if (processingTicketId){
                            this.setState({
                                statusTicket: STATUS.BUSY
                            })
                        } else {
                            this.setState({
                                statusTicket: STATUS.WAITING
                            })
                        }
                    })
                    .catch(err => console.log('err ', err)); 
            }
        })
        .catch(err => console.log('err ', err)); 

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

    getButtonExit(){
        let control = "";
        if( this.state.statusTicket != STATUS.CLOSED ) control = (
            <button type="button" class="btn btn-danger">Exit</button>
        )
        return control;
    }
    render() {
        return (
            <div>
                <h3>Ticket id is {this.state.ticketId}</h3>
                {this.getStatusTicket()}
                {this.getButtonExit()}
            </div>
        )
    }
}
