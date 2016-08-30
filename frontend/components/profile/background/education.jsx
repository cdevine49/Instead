import React from 'react';
import School from './school';
import SchoolForm from './schoolForm';

export default class Education extends React.Component {

  constructor(props) {
    super(props);
    this.state = { _create: false };
  }

  _create() {
    this.setState({ _create: true });
  }

  _close() {
    this.setState({ _create: false });
  }

  addSchool() {
    if (this.state._create) { return ( <SchoolForm /> ); }
  }

  render() {
    var schools = this.props.schools.map(function(school, index) {
      return (
        <School key={index} school={school} editable={this.props.editable} />
      );
    }.bind(this));

    return (
      <div className='work-experiences editing-section'>
        <header className='work-experiences-header'>
          <h2>Education</h2>
          <button className='add-work-experience-button' onClick={() => this._create()}>Add Education</button>
        </header>
        {this.addSchool()}
        <ul className='work-experience-list'>
          {schools}
        </ul>
        <button className='bottom-add-button'>Add Education</button>
      </div>
    );
  }
}

Education.defaultProps =  { schools: [] };
