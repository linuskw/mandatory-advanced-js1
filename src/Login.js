import React from 'react';
import UIfx from 'uifx';




class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: "",
      valid: "none",
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({user: e.target.value})
    this.props.change(this.state.user);
    this.setState({ valid: "none"})
  }

  submit(e){
    e.preventDefault();
    let userRegex = /^[a-zA-z0-9åäöÅÄÖ]+$/;
    let validUsername = this.state.user.match(userRegex);
    if (validUsername && this.state.user.length >= 1 && this.state.user.length <= 12) {
      this.props.submit(this.state.user, true)
      this.setState({user: ""})
    } else {
        console.log("Not valid");
        this.setState({valid: "block"});
    }
  }

  render(){
    return (
      <div id="loginDiv">
        <h1>Username: </h1>
        <form onSubmit={this.submit}>
          <input type="text"  value={this.state.user} onChange={this.change}/>
          <input type="submit" value="Login"/>
        </form>
        <label id="nameValid" style={{ display: this.state.valid }}>Username not valid</label>
      </div>
    )
  }
}

export default Login;
