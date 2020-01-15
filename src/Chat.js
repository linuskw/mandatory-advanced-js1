import React from 'react';
import UIfx from 'uifx';
import notificationSound from './messenger.mp3';
import io from 'socket.io-client';
import Emojify from 'react-emojione';
import Linkify from 'react-linkify';
import { animateScroll } from 'react-scroll';





class Chat extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      chatArray: [],
      chatMessage: "",
      value: "",
    }

    this.socket = io('http://3.120.96.16:3000');


    this.notification = new UIfx(
      notificationSound,
      {
        volume: 0.5, // number between 0.0 ~ 1.0
        throttleMs: 10
      }
    )


    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);

    this.quit = this.quit.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
  }



  componentDidMount(){
    this.scrollToBottom();
    this.socket.on('connect', function(){
      console.log("Connected");
    });
    this.socket.on('messages', (data) => {
      this.setState({chatArray: data});
    });
    this.socket.on('new_message', (message) => {
      console.log("NEW MESSAGE", message);
      let newMessage = {
        username: message.username,
        content: message.content
      }
      this.notification.play();
      this.setState({chatArray: this.state.chatArray.concat(newMessage)});
    });
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  componentWillUnmount(){
    this.socket.close();
    console.log("test");
  }

  scrollToBottom(){
    animateScroll.scrollToBottom({
      containerId: "chatBox",
      duration: 100,
    })
  }

  change(e){
    this.setState({chatMessage: e.target.value});
    this.props.change(this.chatMessage);
  }

  submit(e){
    e.preventDefault();
    let localMessage = {
      username: this.props.user,
      content: this.state.chatMessage
    };

    if (localMessage.content.length >= 1 && localMessage.content.length <= 200) {
      this.socket.emit('message', localMessage);
      this.setState({chatArray: this.state.chatArray.concat(localMessage)});
      this.setState({chatMessage: ""})
    } else {
      console.log("Message not valid");
    }
  }

  quit(){
    this.props.quit(false)
  }

  render(){
    console.log(this.state.chatArray);
    return (
      <div id="chatContainer">
        <div id="chatHead">
        <p>Chat</p>
        <button onClick={this.quit}>Logout</button>
        </div>
        <div id="chatBox">{ this.state.chatArray.map((value, index) => {
          return <Emojify><Linkify target="_blank"><li key={ index + value.content }>{ value.username }: { value.content }</li></Linkify></Emojify>
          })}
        </div>
        <form onSubmit={this.submit}>
          Message:
          <input type="text" value={this.state.chatMessage} onChange={this.change}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}

export default Chat;
