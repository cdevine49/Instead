import React from 'react';
import SchoolForm from './schoolForm';


export default class School extends React.Component {

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
    const school = this.props.school;
    const monthsHelper = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May",
                          6: "June", 7: "July", 8: "August", 9: "September",
                          10: "October", 11: "November", 12: "December"};
    if (this.state.editing) {
      return (
        <SchoolForm workExperience={school} close={this._cancel} />
      );
    } else {
      return (
        <li className='work-experience-item editable-container'>
          <div className="editable-wrapper">
            <div>
              <h4 className='editable-wrapped work-experience-text work-experience-position' >{school.school}</h4>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <h5 className='editable-wrapped work-experience-text work-experience-company'>[{school.degree}, {school.field}, {school.grade}].join(', ')</h5>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <span className='editable-wrapped work-experience-text work-experience-time'>
                <time>{monthsHelper[school.start_month]} {school.start_year}</time>{ school.end_year ? '-' : '' }<time>{monthsHelper[school.end_month]} {school.end_year}</time>
              </span>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <p className='editable-wrapped work-experience-text work-experience-description'>{school.description}</p>
              {this._editButton()}
            </div>
          </div>
          <div className="editable-wrapper">
            <div>
              <p className='editable-wrapped work-experience-text work-experience-description'>Activities and Societies: <br /> {school.extracurriculars}</p>
              {this._editButton()}
            </div>
          </div>
        </li>
      );
    }
  }
}
