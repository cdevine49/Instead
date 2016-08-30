import React from 'react';
import { fetchExperiences } from '../../../utils/workExperience';
import { WorkStore } from '../../../stores/work';
import WorkExperience from './workExperience';
import WorkExperienceForm from './workExperienceForm';

export default class WorkExperiences extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workExperiences: [],
      _create: false
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    fetchExperiences(this.props.id);
    this.experienceStoreToken = WorkStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    this.experienceStoreToken.remove();
  }

  _onChange() {
    this.setState({ workExperiences: WorkStore.all() });
  }

  _create() {
    this.setState({ _create: true });
  }

  _close() {
    this.setState({ _create: false });
  }

  addWorkExperience() {
    if (this.state._create) { return ( <WorkExperienceForm close={this._close.bind(this)} /> ); }
  }
  render() {

    var workExperiences = this.state.workExperiences.map(function(we, index) {
      return (
        <WorkExperience key={index} workExperience={we} editable={this.props.editable} />
      );
    }.bind(this));

    return (
      <div className='work-experiences editing-section'>
        <header className='work-experiences-header'>
          <h2>Experience</h2>
          <button className='add-work-experience-button' onClick={() => this._create()}>Add Position</button>
        </header>
        {this.addWorkExperience()}
        <ul className='work-experience-list'>
          {workExperiences}
        </ul>
        <button className='bottom-add-button' onClick={() => this._create}>Add Position</button>
      </div>
    );
  }
}

WorkExperiences.defaultProps =  { workExperiences: [] };
