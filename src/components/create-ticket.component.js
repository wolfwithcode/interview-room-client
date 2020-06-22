import React, { Component } from 'react'
import axios from 'axios';

export default class CreateTicket extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSkypeId = this.onChangeSkypeId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            skypeId: '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeSkypeId(e){
        this.setState({
            skypeId: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const ticket = {
            username: this.state.username,
            description: this.state.description,
            skypeId: this.state.skypeId,
        }
        console.log('ticket ', ticket);
        axios.post('http://localhost:5000/tickets/add', ticket)
            .then(
                res => {
                    console.log("new ticket with ", res.data);
                    window.location = `/waiting/${res.data}`;
                }
            );
    }

    render() {
        return (
            <div>
                <h3>Create New ticket log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea 
                            className="form-control" cols="30" rows="10"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        >
                            
                        </textarea>
                        {/* <input type="text"
                            required
                            className="form-control"
                            // value={this.state.description}
                            onChange={this.onChangeDescription}
                        /> */}
                    </div>
                    <div className="form-group">
                        <label>Skype Id: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.skypeId}
                            onChange={this.onChangeSkypeId}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Ticket"  className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
