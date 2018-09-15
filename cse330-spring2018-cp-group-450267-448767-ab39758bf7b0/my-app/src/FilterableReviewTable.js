//import necessary dependencies/bootstrap components
import React from 'react';
import SearchBar from './SearchBar';
import ReviewsTable from './ReviewsTable';
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');


// this is our reviews table component that filters what is displayed

class FilterableReviewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      filterSchool: '',
      filterDept: ''
    };
    
    //our event handlers, binds this to events
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSchoolChoiceChange = this.handleSchoolChoiceChange.bind(this);
    this.handleDeptChange = this.handleDeptChange.bind(this);
  }


  //handles department search
  handleDeptChange(filterDept) {
    this.setState({
      filterDept: filterDept
    });
  }

  //handles course search
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  //handles button changes, pick school 
  handleSchoolChoiceChange(filterSchool) {
    this.setState({
      filterSchool: filterSchool
    });
  }

  render() {
    return (
      <div>
        {
          // includes our search bar component
        }
            <SearchBar 
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
             filterSchool={this.state.filterSchool}
              onFilterSchoolChange={this.handleSchoolChoiceChange}
              filterDept={this.state.filterDept}
              onFilterDeptChange={this.handleDeptChange}
        />

        {
          // this is our reviews table that displays every review
        }
        <ReviewsTable
          user={this.props.user}
          reviews={this.props.reviews}
          filterText={this.state.filterText}
          filterSchool={this.state.filterSchool}
          filterDept={this.state.filterDept}
        />
      </div>
    );
  }
}
export default FilterableReviewTable;