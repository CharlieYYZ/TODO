import React from "react";
import "./styles.css";
import 'fontsource-roboto';
import { Button, Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Container from '@material-ui/core/Container';


const Header = (props) => {
  return(
    <Container maxWidth="sm"> 
    <h1>
        You have {props.numTodos} Todos
    </h1>
    </Container>
  )
}

const TodoList = (props) => {
  const todos = props.tasks.map((todos, index) => 
  
    <div key={index} id={index} >
      
      <ListItem key={index} role={undefined} dense button>
      <ListItemText id={index} primary={todos}/>
      <ListItemSecondaryAction>
      <IconButton edge="end">
      <HighlightOffIcon color="primary" fontSize="small" onClick={(e) => {props.onDelete(index)}}/>
      </IconButton>
      </ListItemSecondaryAction>
      </ListItem>
    </div>);
    return (
      <Container maxWidth="sm">
      <div className="taskList">
      <ul>{todos}</ul>
      </div>
    </Container>
    )
  };


  class TaskTimer extends React.Component {


    render = (props) => {
      return(
        <div> 
          <Container maxWidth="sm">
        <h1>Pomodoro Timer</h1>
        
        <h2>{String(Math.floor(this.props.time/60)).padStart(2, '0')}:{String(this.props.time%60).padStart(2, '0')}</h2>
        <div>
        {/* <audio controls loop="true" src="http://bruitages.free.fr/horloges/tic_tac_reveil.wav">
          Your browser does not support the
          <code>audio</code> element.
        </audio> */}
        {/* <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs={3}>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid> */}
        </div>

        <ul id="duration">
          <li><Button size= "small" variant="contained" value={25} onClick={(e) => this.props.onDuration(e.currentTarget.value)}>{this.props.btnState? '+ 25 min' : '25 min'}</Button></li>
          <li><Button size= "small" variant="contained" value={15} onClick={(e) => this.props.onDuration(e.currentTarget.value)}>{this.props.btnState? '+ 15 min' : '15 min'}</Button></li>
          <li><Button size= "small" variant="contained" value={5} onClick={(e) => this.props.onDuration(e.currentTarget.value)}>{this.props.btnState? '+ 5 min' : '5 min'}</Button></li>
        </ul>
        <br/>
        <div className="container">
        <ul id="control">
          <li><Button size= "small" variant="contained" disabled={this.props.disabled} onClick={(e) => {this.props.onStart()}}>{this.props.btnState? 'Pause' : 'Start'}</Button></li>
          <li><Button size= "small" variant="contained" onClick={(e) => this.props.onStop()}>Reset</Button></li>
        </ul>
        </div>
    
        </Container>
        </div>
      )
    }
  }
  class SubmitForm extends React.Component {
    state = { term: ''};

    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.term === '') return;
      this.props.onFormSubmit(this.state.term);
      this.setState({term:''});
    }

    render() {
      return(
        
        <div className="container">
        <Container maxWidth="sm">
        <form onSubmit={this.handleSubmit}>
          <TextField 
            id="outlined"
            label="Add a Task"
            type='text'
            className='input'
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
        </form>
        </Container>
        </div>
        
      );
    }
  }
    
class App extends React.Component {

constructor(props){
  super();
  this.state = {
    tasks:[],
    initialtime: 60 * 25,
    time: 60 * 25,
    disabled: false,
    countingdown: false,
  };
  this.timer = 0;
}

componentDidMount() {
// this.handleStart()
}


componentDidUpdate(prevProps, prevState) {
  if (prevState.time === 0 && prevState.countingdown === true) {
    this.setState({countingdown: false});
    this.resetTime();
  }
}

  
handleDuration = duration => {

  if (this.state.countingdown === false) {
    this.setState({disabled: false, time: duration * 60, initialtime: duration * 60})
  } else { 
    let currentTime = this.state.time
    this.setState({time: duration * 60 + currentTime})
  }
  };
  
  handleStart = () => {

    if (this.state.countingdown === false) {
      this.setState({countingdown: true})
      return this.startTime();  
    } else {
      this.setState({countingdown: false})
      return this.resetTime();
    }
    
  }

  startTime(){ 
  this.timer = setInterval(() => {
      this.setState({time:Math.max(this.state.time - 1,0)})
    }, 1000);}


  resetTime() {
    const startTime = this.timer
    clearInterval(startTime)
  }
  
    handleStop = () => {
      // window.location.reload(false)
      let initialtime = this.state.initialtime
      if (this.state.time !== 0) {
        this.setState({countingdown: false, time: initialtime})
        return this.resetTime();
      } else {
        this.setState({time: initialtime})
      }
      
    }
 
  handleDelete = (index) => {
    const newArr = this.state.tasks;
    newArr.splice(index, 1);
    this.setState({tasks: newArr});
  };

  handleSubmit = termTask => {
    const submitArr = this.state.tasks
    submitArr.push(termTask);
    this.setState({tasks:submitArr})
}
  
  render() {
    return(
       <div>
         <Header numTodos={this.state.tasks.length}/>
         <TaskTimer disabled={this.state.disabled} time={this.state.time} onDuration={this.handleDuration} 
         onStart={this.handleStart} onStop={this.handleStop} btnState={this.state.countingdown}/>
         <TodoList tasks={this.state.tasks} onDelete={this.handleDelete}/>
         <SubmitForm onFormSubmit={this.handleSubmit}/>
      </div>
    );
  }
}


export default App;