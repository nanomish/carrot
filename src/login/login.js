import React, { Component } from 'react';
import './login.scss';
import {LoginService} from './login.service';
var loginService;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    loginService = new LoginService();
  }

  emailChange(event) {
    this.setState({email: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    console.log('An email is being submitted: ' + this.state.email);
    console.log('An email is being submitted: ' + event);

    const t = fetch(`http://localhost:8080/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        loginService.setToken(data.data);
        console.log('data: ', data)
      });
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

