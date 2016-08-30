import React from 'react';
import WorkExperiences from './background/workExperiences';
import Education from './background/education';

export default class Background extends React.Component{

  render() {
    // <Education id={this.props.id} editable={this.props.editable} />
    return (
      <div className='background'>
        <WorkExperiences id={this.props.id} editable={this.props.editable} />
      </div>
    );
  }

}
