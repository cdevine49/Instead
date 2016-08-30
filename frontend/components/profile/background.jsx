import React from 'react';
import WorkExperiences from './background/workExperiences';
import Education from './background/education';

export default class Background extends React.Component{

  render() {
    return (
      <div className='background'>
        <WorkExperiences workExperiences={this.props.profile.work_experiences} editable={this.props.editable} />
        <Education schools={this.props.profile.schools} editable={this.props.editable} />
      </div>
    );
  }

}
