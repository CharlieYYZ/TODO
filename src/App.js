import React from "react";
import "./styles.css";

const Header = (props) => {
  return(
    <h1>
        You have {props.numTodos} Todos
    </h1>
  )
}

const TodoList = (props) => {
  // console.log(props)
  const todos = props.tasks.map((todos, index) => 
    <div key={index} id={index} >
      <li contenteditable="true">{todos}</li>
      <button onClick={(e) => {props.onDelete(index)}}>
        delete
      </button>
    </div>);
    return (
      <ul>{todos}</ul>
    )
  };


  class TaskTimer extends React.Component {


    render = (props) => {
      return(
        <div> 
        <h1>Pomodoro Timer</h1>

        <h2>{String(Math.floor(this.props.time/60)).padStart(2, '0')}:{String(this.props.time%60).padStart(2, '0')}</h2>
        <div><button value={25} onClick={(e) => this.props.onDuration(e.target.value)}>25</button></div>
        <div><button value={15} onClick={(e) => this.props.onDuration(e.target.value)}>15</button></div>
        <div><button value={5} onClick={(e) => this.props.onDuration(e.target.value)}>5</button></div>
        <br></br>
        <button disabled={this.props.disabled} onClick={(e) => {this.props.onStart()}}>Start</button>
        <button onClick={(e) => this.props.onStop()}>Reset</button>
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
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            className='input'
            placeholder='Enter Item'
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <input type="submit" value="Submit"></input>
        </form>
      );
    }
  }
    
class App extends React.Component {

constructor(props){
  super(props);
  this.state = {
    tasks:[],
    initialtime: 3,
    time: 3,
    disabled: false,
    countingdown: false,
  };
  this.timer = 0;
}

componentDidMount() {
// this.handleStart()
}


componentDidUpdate(prevProps, prevState) {
  console.log(prevState)
  if (prevState.time === 0) {
    this.setState({countingdown: false, disabled: true});
    return this.resetTime();
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
      this.setState({time:Math.floor(this.state.time - 1,0)})
    }, 1000);}


  resetTime() {
    const startTime = this.timer
    clearInterval(this.timer)
    console.log(startTime)
  }
  
    handleStop = () => {
      // window.location.reload(false)
      let initialtime = this.state.initialtime
      if (this.state.time !== 0) {
        this.setState({countingdown: false, time: initialtime})
        return this.resetTime();
      }
      
    }
 
  handleDelete = (index) => {
    const newArr = this.state.tasks;
    console.log(index);
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
         onStart={this.handleStart} onStop={this.handleStop}/>
         <TodoList tasks={this.state.tasks} onDelete={this.handleDelete}/>
         <SubmitForm onFormSubmit={this.handleSubmit}/>
      </div>
    );
  }
}


export default App;