import React from 'react';
import WorkExperienceForm from './workExperienceForm';


export default class WorkExperience extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this._edit = this._edit.bind(this);
    this._cancel = this._cancel.bind(this);
  }

  _edit() {
    this.setState({ editing: true });
  }

  _cancel() {
    this.setState({ editing: false });
  }

  _editButton() {
    if (this.props.editable) {
      return (
        <div className='edit-box' onClick={this._edit}>
          <div
            className='edit-button'>
            <i className='fa fa-pencil' onClick={this._edit}>
            </i>
          </div>
        </div>
      );
    }
  }

  render() {
    const workExperience = this.props.workExperience;
    const monthsHelper = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May",
                          6: "June", 7: "July", 8: "August", 9: "September",
                          10: "October", 11: "November", 12: "December"};
    if (this.state.editing) {
      return (
        <WorkExperienceForm workExperience={workExperience} close={this._cancel} />
      );
    } else {
      return (
        <li className='work-experience-item editable-container'>
          <div className="editable-wrapper">
            <div>
              <h4 className='editable-wrapped work-experience-text work-experience-position' >{workExperience.position}</h4>
              {this._editButton()}
          </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <h5 className='editable-wrapped work-experience-text work-experience-company'>{workExperience.company}</h5>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <span className='editable-wrapped work-experience-text work-experience-time'>
                <time>{monthsHelper[workExperience.start_month]} {workExperience.start_year}</time>{ workExperience.end_year ? '-' : '' }<time>{monthsHelper[workExperience.end_month]} {workExperience.end_year}</time>
              </span>
              <span className='editable-wrapped work-experience-text work-experience-location'>{workExperience.location}</span>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <p className='editable-wrapped work-experience-text work-experience-description'>{workExperience.description}</p>
              {this._editButton()}
            </div>
          </div>
        </li>
      );
    }
  }
}
