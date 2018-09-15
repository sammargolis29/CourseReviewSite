//import necessary dependencies and bootstrap components
import React from 'react';
import ReviewRow from './ReviewRow';
var Table = require('react-bootstrap/lib/Table');

//this component is the table of all of the reviews

class ReviewsTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const filterSchool= this.props.filterSchool;
    const filterDept= this.props.filterDept;

    const rows = [];
    
      //iterates through each review object
    
    this.props.reviews.forEach((review) => {
      if (review.course.indexOf(filterText) === -1) {
        return;
      }
      if (review.dept.indexOf(filterDept) === -1) {
        return;
      }
      // eslint-disable-next-line
      if (filterSchool == 1||filterSchool == "") {
     
      }
      // eslint-disable-next-line
      else if(filterSchool != review.deptNum) {
     
        return;
      }
      
        //adds each review to the review tables
      
      rows.push(
        <ReviewRow
          user={this.props.user}
          review={review}
          tag={review.tag}
          key={review.deptNum*17+review.course+review.review}
        />
      );
    });

    //returns set up of review table header, plus rows for each one

    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th style={{textAlign: "center"}} className="col-md-1">Course Title</th>
            <th style={{textAlign: "center"}} className="col-md-1">School</th>
            <th style={{textAlign: "center"}} className="col-md-1">Department</th>
            <th style={{textAlign: "center"}} className="col-md-8">Review</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export default ReviewsTable;