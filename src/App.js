import './App.css';
import Cookies from 'js-cookie';
import React from 'react';

function App() {
  return (<AppComponent />);
}

class AppComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      isAuthorizedUser: null
    }
  }

  async componentDidMount() {
    await this.check_login().then(isAuthorizedUser => {
      this.setState({ isAuthorizedUser: isAuthorizedUser });
      console.log("Should be setting isAuthorizedUser")
      console.log(isAuthorizedUser)
    })
    
  }

  render() {
    console.log("is rendering")
    if (this.state.isAuthorizedUser) {
      console.log("Logged in boi");
      return (
        <div className="App">
          <p>Congrats! You're logged in</p>
      </div>
      )
    } else if (this.state.isAuthorizedUser === null) {
      console.log("it null, do nutin");
    } else {
      console.log("navigate to login")
      this.navigateToLogin()
    }
    
  }

  navigateToLogin() {
    // Navigate to Login
    window.location.assign('/login');
  }

  isLoggedIn() {
    return this.check_login()
  }

  async check_login() {
    const url = 'http://127.0.0.1:8000/api/is_user_logged_in'
    const axios = require('axios').default;
    const config = {
      headers:{
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      }
    };
    return await axios.get(url, config)
      .then(function (response) {
        // handle success
        console.log(response);
        return true;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return false;
      })
  }
}



export default App;
