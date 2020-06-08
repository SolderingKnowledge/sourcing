import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
    state = {
        todos: []
    }
    onClick= async () => {
        console.log("clicked")
        const res = await axios.get("http://localhost:5000");
        this.setState({todos: res.data.todos});
    }
    render(){
        const { todos } = this.state;
        return (
            <div className="App">
                { todos.length ? todos.map( (todo, idx) => {
                      return (
                      <div key={idx}>{todo}</div>
                      )
                  }): <button onClick={this.onClick}>Press me to get data</button>
                }
            </div>
        );
    }
};

export default App;
