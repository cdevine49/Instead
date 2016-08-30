import React from 'react';
import School from './school';
import { fetchEducation } from '../../../utils/school';
import { EducationStore } from '../../../stores/education';
import SchoolForm from './schoolForm';

export default class Education extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      education: [],
      _create: false
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    fetchEducation(this.props.id);
    this.educationStoreToken = EducationStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    this.educationStoreToken.remove();
  }

  _onChange() {
    this.setState({ education: EducationStore.all() });
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
    var schools = this.state.education.map(function(school, index) {
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
