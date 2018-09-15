// include necessary dependencies
import React from 'react';
import axios from 'axios';
import logo from './enrollment-icon.png';
import './App.css';
import Login from './Login';
import ReviewModal from './ReviewModal';
import FilterableReviewTable from './FilterableReviewTable';
import Background from './Red-gradient.jpg';

//include bootstrap variables
var Button = require('react-bootstrap/lib/Button');
var Navbar = require('react-bootstrap/lib/Navbar');


// main page
class App extends React.Component {
  constructor(props) {
   super(props);
   this.state = { 
    data: [],
    isLoggedIn: false,
    user:"no user" };
    this.loadReviewsFromServer = this.loadReviewsFromServer.bind(this);
    this.logout = this.logout.bind(this);
  }

  //loads the reviews form the server, assigns to data
  loadReviewsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  //event handler for when an event is submitted
  handleReviewSubmit = (review) => {
    let reviews = this.state.data;
    review.id = Date.now();
    let newReviews = reviews.concat([review]);
    this.setState({ data: newReviews });
    axios.post(this.props.url, review)
      .catch(err => {
        console.error(err);
        this.setState({ data: reviews });
      });
  }

  //when app is loaded, call load reviews from server, check periodically 
  componentDidMount() {
    this.loadReviewsFromServer();
    setInterval(this.loadReviewsFromServer, this.props.pollInterval);
  }

  //runs after a user is logged in, to set state to a user is logged in
  userLogin = (loginState) =>{
    this.setState({isLoggedIn:loginState});
    console.log(this.state.loginState);
  }

  //sets the state to the specific user logged in 
  theUser = (theuser) =>{
    this.setState({user:theuser});
  }

  //sets the state when a user logs out
  logout(props) {
    this.setState({isLoggedIn:false});
  }


//render function
render() {
  return (
    <div className="App">
    {
        // here is our header
      }
      <header style={{backgroundColor: "#a51417"}} className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Take this, not that!</h1>
      </header>

      {
        // if statement, renders different components based on if the user is logged in 
      }

      {this.state.isLoggedIn ? (
         
        // if user is logged in
        
          <div>
            <Navbar inverse>
              <Navbar.Header>
                <Navbar.Brand>
                  Take this, not that! 
                  Welcome {this.state.user}!
                 </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
          </div>
        ) : 
         
        // if user is not logged in
        
        (
          <div >
            <Navbar inverse style={{backgroundColor:'#222', color:"#fff"}}>
              <Navbar.Header>
                <Navbar.Brand>
                  Take this, not that!
                </Navbar.Brand>
              </Navbar.Header>
                <Login callbackFromParent={this.userLogin} otherCallbackFromParent={this.theUser}/>
            </Navbar>;
        </div>
        )}
        {
          // This is our table of reviews, can be filtered
        }
        <FilterableReviewTable user={this.state.user} reviews={this.state.data} />

        {
        // if statement, renders different components based on if the user is logged in 
        }

        {this.state.isLoggedIn ? (
          
        // if user is logged in
          
          <div style={{margin: '30px'}}>
            <Button  className="pull-right"  bsSize="large" onClick={this.logout}>
            Logout
            </Button>
            <ReviewModal user={this.state.user} theCallback={this.handleReviewSubmit} />
            <footer style={{backgroundColor:'#222', height:'150px', color:"#fff", position:"fixed", left: "0", bottom: "0", width: "100%"}}>
              <p><i>Currently logged in as {this.state.user}.<br/>
              To update or delete a review, please select the review.</i></p>
            </footer>
          </div>
          ) : (
          
        // if user is not logged in
          
          <div>
            <footer style={{backgroundColor:'#222', height:'150px', color:"#9d9d9d", position:"fixed", left: "0", bottom: "0", width: "100%"}} >
              <p><i>Want to write a review? Login!</i></p>
            </footer>
          </div>
          )}
          {
            // end of app.js div
          }
          </div>
          );

  
  } 
}

export default App;

