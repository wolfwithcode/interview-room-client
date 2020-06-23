import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercise-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';
import CreateTicket from './components/create-ticket.component';
import WaitingInterviewer from './components/waitingInterviewer.component';
import TicketList from './components/ticket-list.component';



function App() {
  return (
    // <div>
    //   <Router>
    //     <div className="container">
    //         <Navbar />
    //         <br/>
    //     </div>
    //   </Router>
    // </div>
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList}/>
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise}/>
        <Route path="/createTicket" component={CreateTicket} />
        <Route path="/user" component={CreateUser} />
        <Route path="/waiting/:id" component={WaitingInterviewer} />
        <Route path="/dashboard" component={TicketList} /> 
      </div>
    </Router>
  );
}

export default App;
