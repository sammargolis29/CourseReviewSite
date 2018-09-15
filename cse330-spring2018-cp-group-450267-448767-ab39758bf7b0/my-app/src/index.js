import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import LoginPage from './components/LoginPage';
import registerServiceWorker from './registerServiceWorker';
// import CommentBox from './CommentBox';



ReactDOM.render(
	// <CommentBox
 // url='http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/comments'
 // pollInterval={2000} />,
	 <App 
url='http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/reviews'
pollInterval={2000} />,
//<Route path="/login" component={LoginPage}/>,
	document.getElementById('root'));
registerServiceWorker();



