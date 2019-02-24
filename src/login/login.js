import React, { Component } from 'react';
import './login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  emailChange(event) {
    this.setState({email: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    console.log('An email was submitted: ' + this.state.email);
    return fetch(`localhost:8080/api`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page">
        <div style={{margin: 1 + 'em'}}>
          <input className="input-component"
                 placeholder="email"
                 onChange={this.emailChange.bind(this)} />
        </div>
        <div style={{margin: 1 + 'em'}}>
          <input className="input-component"
                 placeholder="password"
                 type="password"
                 onChange={this.passwordChange.bind(this)}/>
        </div>
        <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} />
        {this.state.password}
      </div>
    );
  }
}

