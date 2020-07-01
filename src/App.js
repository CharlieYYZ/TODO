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
        <h1>Timer</h1>

        <h2>{String(Math.floor(this.props.time/60)).padStart(2, '0')}:{String(this.props.time%60).padStart(2, '0')}</h2>
        <button disabled={this.props.disabled} onClick={(e) => {this.props.onStart()}}>Start</button>
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

  state = {
    tasks:[],
    time: 1 * 60,
    disabled: false
  };

  handleStart = () => {
      this.setState({disabled: true})
      let resetTime = this.state.time
      this.interval = setInterval(() => {
        this.setState({time:this.state.time -1 });
      }, 1000);

      setTimeout(() => {
        console.log();
        clearInterval(this.interval); alert('Time is up!');this.setState({time:resetTime, disabled: false})
      }, this.state.time * 1000);
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
         <TaskTimer disabled={this.state.disabled} time={this.state.time} onStart={this.handleStart}/>
         <TodoList tasks={this.state.tasks} onDelete={this.handleDelete}/>
         <SubmitForm onFormSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;