//import necessary dependencies and bootstrap components
import React from 'react';
import style from './style';

var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');


// this component handles the modal form that pops up to update/delete reviews

class UpdateDelete extends React.Component {
 constructor(props) {
   super(props);
   this.state = { school: this.props.review.school, deptNum: this.props.review.deptNum, dept: this.props.review.dept, 
    course: this.props.review.course, review: this.props.review.review, prof: this.props.review.prof, uID:this.props.uID, tag:this.props.review.tag};
    
    //handles the change/click function events of the form elements, binds to this
    this.handleArtSciChange = this.handleArtSciChange.bind(this);
    this.handleEngChange = this.handleEngChange.bind(this);
    this.handleBusChange = this.handleBusChange.bind(this);
    this.handleArtChange = this.handleArtChange.bind(this);
    this.handleDeptNumChange = this.handleDeptNumChange.bind(this);
    this.handleDeptChange = this.handleDeptChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.handleLectureChange = this.handleLectureChange.bind(this);
    this.handleReadingChange = this.handleReadingChange.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
    this.handleSkipChange = this.handleSkipChange.bind(this);
    this.handleExamChange = this.handleExamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // individual functions to set state of each form element on change/click
  handleArtSciChange(e) {
    this.setState({ deptNum: 2});
    this.setState({school:"Arts & Sciences"});
  }
  handleEngChange(e) {
    this.setState({ deptNum: 3});
    this.setState({school:"Engineering and Applied Sciences"});
  }
  handleBusChange(e) {
    this.setState({ deptNum: 4});
    this.setState({school:"Olin Business"});
  }
  handleArtChange(e) {
    this.setState({ deptNum: 5});
    this.setState({school:"Sam Fox Art/Architecture"});
  }
  handleDeptNumChange(e) {
   this.setState({ deptNum: e.target.value });
 }
 handleDeptChange(e) {
   this.setState({ dept: e.target.value });
 }
 handleCourseChange(e) {
   this.setState({ course: e.target.value });
 }
 handleReviewChange(e) {
   this.setState({ review: e.target.value });
 }
 handleProfChange(e) {
   this.setState({ prof: e.target.value });
 }
 handleTagChange(e) {
   this.setState({ tag: e.target.value });
 }
 handleLectureChange(e) {
   this.setState({ tag: "Great Lectures" });
 }
 handleReadingChange(e) {
   this.setState({ tag: "Reading Heavy" });
 }
 handleGPAChange(e) {
   this.setState({ tag: "GPA Booster" });
 }
 handleSkipChange(e) {
   this.setState({ tag: "Don't skip!" });
 }
 handleExamChange(e) {
   this.setState({ tag: "Tough Exams" });
 }

// function to handle submission of the updated review
 handleSubmit(e) {
   e.preventDefault();
   let school = this.state.school.trim();
   let deptNum = this.state.deptNum;
   let dept = this.state.dept.trim();
   let course = this.state.course.trim();
   let review = this.state.review.trim();
   let prof = this.state.prof.trim();
   let tag = this.state.tag.trim();
   let theUID = this.state.uID.trim();
   //ensures that no field is empty
   if (!school || !deptNum || !dept || !course || !review || !prof || !tag) {
     return;
   }
   this.props.onUpdateSubmit(
    {theUID},
    { school: school, deptNum: deptNum, dept: dept, course: course, review: review, prof: prof, tag:tag }
    );
  }

  //handles deletion of the review
handleDelete(e) {
  let theUID = this.state.uID.trim();
  this.props.onDeleteSubmit(
    {theUID}
    );
}

render() {
 return (
  <div>
  {
    // form on update/delete modal
  }
  <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
    <DropdownButton
      title={this.state.school}
      id={'dropdown-basic'}
      defaultValue={2}
    >
      <MenuItem value={2} id= "ArtSci" onClick={ this.handleArtSciChange } eventKey="1" >Arts & Sciences</MenuItem>
      <MenuItem value={3} id= "Engineering"  onClick={ this.handleEngChange } eventKey="2" >Engineering and Applied Sciences</MenuItem>
      <MenuItem value={4} id= "Business"  onClick={ this.handleBusChange } eventKey="3" >Olin Business</MenuItem>
      <MenuItem value={5} id= "Art"  onClick={ this.handleArtChange } eventKey="4" >Sam Fox Art & Architecture</MenuItem>
    </DropdownButton>

    <input
      type='text'
      placeholder='Enter department'
      style={ style.commentFormAuthor}
      value={ this.state.dept }
      onChange={ this.handleDeptChange } />
    <input
      type='text'
      placeholder='Enter course'
      style={ style.commentFormText}
      value={ this.state.course }
      onChange={ this.handleCourseChange } />
    <input
      type='text'
      placeholder='Enter Professor'
      style={ style.commentFormText}
      value={ this.state.prof }
      onChange={ this.handleProfChange } />
    <input
      type='text'
      placeholder='Enter review'
      style={ style.commentFormAuthor}
      value={ this.state.review }
      onChange={ this.handleReviewChange } />
    <input
      type='submit'
      style={ style.commentFormPost }
      value='Update' />
    </form>
      <div>
        <ButtonGroup>
          <Button value={ 'lecture' } onClick={ this.handleLectureChange }>Great Lectures</Button>
          <Button value={ 'reading' } onClick={ this.handleReadingChange }>Reading Heavy</Button>
          <Button value={ 'gpa' } onClick={ this.handleGPAChange }>GPA Booster</Button>
          <Button value={ 'skip' } onClick={ this.handleSkipChange }>Don't skip!</Button>
          <Button value={ 'exam' } onClick={ this.handleExamChange }>Tough Exams</Button>
        </ButtonGroup>
      </div>
    <form onSubmit={ this.handleDelete }>
      <input
        type='submit'
        style={ style.commentFormPost }
        value='Delete' />
    </form>
  </div>
  )
}
}
export default UpdateDelete;