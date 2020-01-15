import React from 'react';
import './App.css';
import Login from './Login.js';
import Chat from './Chat.js';
import UIfx from 'uifx';
import connectedSound from './connected.mp3';
import disconnectedSound from './disconnected.mp3';



class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pageView: true,
      user: "",
      message: "",
    }


    this.connected = new UIfx(
      connectedSound,
      {
        volume: 0.5, // number between 0.0 ~ 1.0
        throttleMs: 10
      }
    )

    this.disconnected = new UIfx(
      disconnectedSound,
      {
        volume: 0.5, // number between 0.0 ~ 1.0
        throttleMs: 10
      }
    )

    this.userChange = this.userChange.bind(this);
    this.userSubmit = this.userSubmit.bind(this);

    this.messageChange = this.messageChange.bind(this);

    this.chatQuit = this.chatQuit.bind(this);
  }

  userChange(user) {
    this.setState({user: user});
  }

  userSubmit(user, bool){
    if (bool) {
      this.setState({pageView: false})
      this.connected.play();
    } else {
      this.setState({pageView: true})
    }
    this.setState({user: user})
  }

  messageChange(message){
    this.setState({message: message});
  }

  // messageSubmit(event){
  //   event.preventDefault();
  //   let chatMessage = {
  //     username: this.state.username,
  //     content: this.state.message
  //   }
  //
  //   this.socket.emit('message', chatMessage);
  //   console.log(chatMessage);
  // }

  chatQuit(bool){
    if (bool) {
      this.setState({pageView: false})
    } else {
      this.setState({pageView: true})
      this.disconnected.play();
    }
  }

  render(){

    if (this.state.pageView) {
      return (
        <Login change={this.userChange} submit={this.userSubmit} user={this.state.user} />
      )
    } else {
      return (
        <Chat change={this.messageChange} quit={this.chatQuit} user={this.state.user}/>
              )
    }
  }
}

export default App;
