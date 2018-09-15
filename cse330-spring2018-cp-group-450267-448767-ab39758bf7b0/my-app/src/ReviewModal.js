//import necessary dependencies/ bootstrap components
import React from 'react';
import ReviewForm from './ReviewForm';
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');


// this component handles the model  pop up to write a review
class ReviewModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    //bind this for events
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);

    this.state = {
      show: false
    };
  }

  //handles submission of the review
  handleReviewSubmit(review) {
    this.props.theCallback(review);
    this.handleClose();
  }
  
  //handles closing of the modal 
  handleClose() {
    this.setState({ show: false });
  }
  //handles showing of the modal
  handleShow() {
    this.setState({ show: true });
  }

  render() {
    

    return (
      <div>
        <Button  className="float-right"  bsSize="large" onClick={this.handleShow}>
          Write Review
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            //renders review form component inside the modal
          }
            <ReviewForm user={this.props.user} onReviewSubmit={ this.handleReviewSubmit }/>
          }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ReviewModal;