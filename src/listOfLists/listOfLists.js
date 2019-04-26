import React, {Component} from 'react';
import './listOfLists.scss';
import {APIService} from '../services/apiService';
import App from "../App";
var apiService;

export class ListOfLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    apiService = new APIService();
  }

  emailChange(event) {
    this.setState({email: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    console.log('An email is being submitted: ' + this.state.email);
    console.log('An email is being submitted: ', event);

    var postObj = {
      email: this.state.email,
      password: this.state.password
    };
    apiService.executeRequest('login', null, postObj)
      .then(data => {
        if (!data || !data.data) {
          this.setState({loginError: 'Error logging in'});
          console.error('error login: ', data);
          this.setState({redirectToMainPage: false});
        } else {
          console.log('data: ', data)
          this.setState({loginError: ''});
          this.setState({token: data.data});
          this.setState({redirectToMainPage: true});
        }
      })
      .catch(error => {
        console.error('catched error login: ', error);
        this.setState({
          token: '',
          redirectToMainPage: true,
          loginError: error.message
        });
      });
  }


  render() {
    if (this.state.redirectToMainPage) {
      return <App/>;
    }
    return (
      <div className="login-page">
        <div style={{margin: 1 + 'em'}}>
          <input className="input-component"
                 placeholder="email"
                 onChange={this.emailChange.bind(this)}/>
        </div>
        <div style={{margin: 1 + 'em'}}>
          <input className="input-component"
                 placeholder="password"
                 type="password"
                 onChange={this.passwordChange.bind(this)}/>
        </div>
        <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
        {this.state.password}
        <div>{this.state.token}</div>
        {this.state.loginError && <div>{this.state.loginError}</div>}
      </div>
    );
  }
}

