import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from './login/login';
import {LoginService} from './login/login.service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faIgloo,faSpinner} from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)
library.add(faSpinner)

var loginService;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingLogin: true
    }
  }

  componentWillMount() {
    loginService = new LoginService();
    console.log('is logged in', loginService.isLoggedIn());
    console.log('ls: ', loginService);
    loginService.isLoggedIn().then(isLoggedIn => {
      this.setState({isLoggedIn});
      this.setState({checkingLogin: false});
    })
  }

  render() {
    if (this.state.checkingLogin) {
      return <div style={{'fontSize': '3em', position: 'absolute', left: '45%', top: '1em'}}>
        <FontAwesomeIcon icon="spinner" />
      </div>;
    }
    else if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
    else {
      return <Login/>;
    }
  }
}

export default App;
