//import necessary dependencies and bootstrap components
import React from 'react';
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var ToggleButtonGroup = require('react-bootstrap/lib/ToggleButtonGroup');
var ToggleButton = require('react-bootstrap/lib/ToggleButton');
var Navbar = require('react-bootstrap/lib/Navbar');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');


//this class contains all of our filtering components, including buttons and search bar

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSchoolChoiceChange = this.handleSchoolChoiceChange.bind(this);
    this.handleDeptChange = this.handleDeptChange.bind(this);
  }
  
  //handles department search
  handleDeptChange(e) {
    this.props.onFilterDeptChange(e.target.value);
  }
  //handles course search
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  //handles school button selection
  handleSchoolChoiceChange(e) {
    this.props.onFilterSchoolChange(e.target.value);
  }
  

  render() {
    return (
      <div>
      {
    //this navbar is our search bars, for courses and department
      }
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text"
            placeholder="Search by course"
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}/>
        </FormGroup>{' '}
      </Navbar.Form>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text"
            placeholder="Search by Department"
            value={this.props.filterDept}
            onChange={this.handleDeptChange} />
        </FormGroup>
      </Navbar.Form>

      {
        //this is our button toolbar for our schools 
      }
      <ButtonToolbar>
        <ToggleButtonGroup 
          className="pull-right"
          type="radio" 
          name="options" 
          defaultValue={1}
    // attempting to store the value of this choice for use in table>
        >
          <ToggleButton value={1} id="All" onChange={this.handleSchoolChoiceChange}>All</ToggleButton>
          <ToggleButton value={2} id="Arts & Sciences" onChange={this.handleSchoolChoiceChange}>Arts & Sciences</ToggleButton>
          <ToggleButton value={3} id="Engineering" onChange={this.handleSchoolChoiceChange}>Engineering and Applied Science</ToggleButton>
          <ToggleButton value={4} id="Business" onChange={this.handleSchoolChoiceChange}>Olin Business</ToggleButton>
          <ToggleButton value={5} id="Art" onChange={this.handleSchoolChoiceChange}>School of Art & Architecture</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    
    </div>
    );
  }
}
export default SearchBar;