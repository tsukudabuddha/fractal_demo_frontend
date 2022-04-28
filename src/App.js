import './App.css';
import React from 'react';
import AuthService from './services/auth.service';

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
    await AuthService.is_logged_in().then(isAuthorizedUser => {
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
}



export default App;
