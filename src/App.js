import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

var socket = io('http://3.120.96.16:3000');
socket.on('connect', function(){
  console.log("Connected");
});
socket.on('messages', function(data){
  console.log(data);
})
socket.on('new_message', message => {
  console.log("NEW MESSAGE", message);
})

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      pageView: true,
      message: "",
    }

    this.userChange = this.userChange.bind(this);
    this.userSubmit = this.userSubmit.bind(this);

    this.messageChange = this.messageChange.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  userChange(event) {
    this.setState({username: event.target.value});
  }

  userSubmit(event){
    console.log("Username: " + this.state.username);
    event.preventDefault();
    if (this.state.pageView === true) {
      this.setState({pageView: false})
    } else {
      this.setState({pageView: true})
    }
    console.log(this.state.pageView);
  }

  messageChange(event){
    this.setState({message: event.target.value});
  }

  messageSubmit(event){
    event.preventDefault();
    let chatMessage = {
      username: this.state.username,
      content: this.state.message
    }

    socket.emit('message', chatMessage);
    console.log(chatMessage);
  }

  render(){
    if (this.state.pageView) {
      return (
        <div>
          <h1>Username: </h1>
          <form onSubmit={this.userSubmit}>
            <input type="text"  value={this.state.username} onChange={this.userChange}/>
            <input type="submit" />
          </form>
        </div>
      )
    } else {
      return (
        // <Chat />
        <div>
          <form onSubmit={this.messageSubmit}>
            Message:
            <input type="text" value={this.state.message} onChange={this.messageChange}/>
            <input type="submit"/>
          </form>
        </div>
      )
    }

  }
}

export default App;
