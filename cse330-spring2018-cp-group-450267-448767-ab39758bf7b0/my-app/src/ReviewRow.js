//import necessary dependencies and bootstrap components
import React from 'react';
import axios from 'axios';
import UpdateDelete from './UpdateDelete';
//var Link = require('react-router-dom').Link;
var Modal = require('react-bootstrap/lib/Modal');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');


// this component is responsible for each row of the review table

class ReviewRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReviewUpdate = this.handleReviewUpdate.bind(this);
    this.handleReviewDelete = this.handleReviewDelete.bind(this);
    this.state = {
      show: false,
      url: 'http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/reviews'

    };
  }

  //handles close of the update/delete modal 

  handleClose() {
    this.setState({ show: false });
  }


  //handles updated review
  handleReviewUpdate(id, review) { 
 //sends the review id and new author/text to our api
  let url = 'http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/reviews';
    axios.put(`${url}/${id.theUID}`, review)
      .catch(err => {
        console.log(err);
      });
    this.setState({ show: false });
  }

  //handles the deletion of a row/review
 handleReviewDelete(id) {
  let url = 'http://ec2-18-220-49-137.us-east-2.compute.amazonaws.com:3001/api/reviews';
    axios.delete(`${url}/${id.theUID}`)
      .then(res => {
        console.log('Review deleted');
       })
      .catch(err => {
        console.error(err);
      });
    this.setState({ show: false });
  }

  //handles showing of the update modal 
  handleShow() {
    const review = this.props.review;
    const uID = review._id;
    const theUser=this.props.user;
    const theTag = this.props.tag; 
    const rightUser=(theUser===review.user);

    //will only show modal if current user matches review user
    if(rightUser){
      this.setState({ show: true })
    }
  }



  render() {
    const review = this.props.review;
    const uID = review._id;
    const theUser=this.props.user;
    const theTag = this.props.tag;
    const rightUser=(theUser===review.user);
    const tooltip = (
        <Tooltip id="tooltip">
        <strong>{theTag}</strong> 
       </Tooltip>
      );
    return (

    
      //renders each row, so that if you click a row and are logged in, will show update/delete modal 
    
      <tr onClick={this.handleShow}>
        <OverlayTrigger placement="right" overlay={tooltip}>
          <td>{review.course}<div><i>{review.prof}</i></div></td>
        </OverlayTrigger>
          <td>{review.school}</td>
          <td>{review.dept}</td>
          <td>{review.review}<div><i>{"-"+review.user}</i></div></td>

        {
          //update/delete modal 
        }  
        <Modal show={this.state.show}>
          <Modal.Header>
            <Modal.Title>Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateDelete uID = {uID} review = {review} onUpdateSubmit={ this.handleReviewUpdate } onDeleteSubmit={ this.handleReviewDelete }/>
          </Modal.Body>

        </Modal>
      </tr>
    );
  }
}

export default ReviewRow;