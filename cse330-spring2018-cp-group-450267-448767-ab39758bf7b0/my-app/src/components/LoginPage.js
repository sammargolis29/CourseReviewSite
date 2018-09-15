//import necessary dependencies/ bootstrap components
import React from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import axios from 'axios';

var passwordHash = require('password-hash');


// this component is our login form, downloaded from npm package listed above
class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			serverdata: [],
			loggedIn: false,
			currentUser: ""
		};

		//handles binding of this for functions
		this.signupWasClickedCallback = this.signupWasClickedCallback.bind(this);
		this.loginWasClickedCallback = this.loginWasClickedCallback.bind(this);
		this.recoverPasswordWasClickedCallback = this.recoverPasswordWasClickedCallback.bind(this);
	}

	//function called if the signup button was clicked, takes in user name and two passwords to confirm signup 
	signupWasClickedCallback(props) {
		console.log(this.props.data);
		let theUsername = props.username;
		let thePassword = props.password;
		//hashes password
		var hashedPassword = passwordHash.generate(thePassword);
		props.password = hashedPassword;
		console.log(hashedPassword);
		let match = false; 

		console.log("props")

		axios.get('http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/users')
			.then(res => {
				let theServerData = res.data;

				theServerData.forEach((user) => {
					if (user.username.indexOf(theUsername) > -1) {
						match=true; 
					} 				});
				if(match){
					alert("Sorry, username already taken");
				}
				else{
					alert("Successful registration");
					this.setState({
								loggedIn: true,
								currentUser: theUsername
							});
					//if fits conditions, user added to the database
					axios.post('http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/users', props)
 						.catch(err => {
 						console.error(err);
 					});
 					this.props.callbackFromParent(this.state.loggedIn);
 					this.props.otherCallback(this.state.currentUser);
				}
			});

	}

	//function called if login function clicked 
	loginWasClickedCallback(props) {
		let theUsername = props.username;
		let thePassword = props.password;

		//user credentials checked against hashed users in database
		axios.get('http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/users')
			.then(res => {
				let theServerData = res.data;
				theServerData.forEach((user) => {
					if (user.username.indexOf(theUsername) === -1) {
						return;
					} else {
						if (passwordHash.verify(thePassword, user.password)) {
						
							this.setState({
								loggedIn: true,
								currentUser: user.username
							});
							this.props.callbackFromParent(this.state.loggedIn);
							this.props.otherCallback(this.state.currentUser);

						} else {
							return;
						}
					}
				});
			});
	}

	//function runs if clicked to recover password
	recoverPasswordWasClickedCallback(props) {
		console.log(this.props.data);
		alert('Recover password callback, see log on the console to see the data.');
	}
	render() {
		return ( 
			<div>
				{
					//renders downloaded npm and runs callback functions accordingly
				}
				<ReactSignupLoginComponent title = "Course Review Login"
					handleSignup = {this.signupWasClickedCallback}
					handleLogin = {this.loginWasClickedCallback}
					handleRecoverPassword = {this.recoverPasswordWasClickedCallback}
				/>
		 	</div>
		);
	}
};

export default LoginPage;