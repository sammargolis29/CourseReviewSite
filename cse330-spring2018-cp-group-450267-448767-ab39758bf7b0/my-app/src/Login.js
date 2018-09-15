//import necessary dependencies/ bootstrap components
import React from 'react';
import LoginPage from './components/LoginPage';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

//this component handles the popup modal that allows users to log in

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      loginState:false,
      loginUser: ""
    };
  }

  //handles closing of the login modal 
  handleClose() {
    this.setState({ show: false });
  }

  //handles showing of the login modal 
  handleShow() {
    this.setState({ show: true });
  }

  //callback function to handle data from login form component, updates state of login
  changeLoginState = (logState) =>{
    this.setState({loginState:logState});
    this.props.callbackFromParent(this.state.loginState);
    this.handleClose(); 
  }

  //callback function to handle data from login form component, updates user logged in 
  changeLoginUser = (user) =>{
    this.setState({loginUser:user})
    this.props.otherCallbackFromParent(user);
  }

  render() {
    

    return (
      <div>
        <Button className="pull-right"  bsSize="large" onClick={this.handleShow}>
          Login/SignUp
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginPage callbackFromParent={this.changeLoginState} otherCallback={this.changeLoginUser}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Login;