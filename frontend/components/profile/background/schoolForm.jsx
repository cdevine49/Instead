import React from 'react';
// change to education
import { createSchool, editSchool, destroySchool } from '../../../utils/school';

export default class SchoolForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      school: this.props.school.school,
      degree: this.props.school.degree,
      field: this.props.school.field,
      grade: this.props.school.grade,
      start_month: this.props.school.start_month,
      start_year: this.props.school.start_year,
      end_month: this.props.school.end_month,
      end_year: this.props.school.end_year,
      description: this.props.school.description,
      extracurriculars: this.props.school.extracurriculars
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit() {
    const data = {
      school: this.state.school,
      degree: this.state.degree,
      field: this.state.field,
      grade: this.state.grade,
      start: [this.state.start_year, this.state.start_month],
      end: [this.state.end_year, this.state.end_month],
      description: this.state.description,
      extracurriculars: this.state.extracurriculars
    };
    if (!this.props.school.id) {
      createSchool({ education: data });
    } else {
      editSchool(this.props.school.id, { education: data });
    }
  }

  destroy() {
    destroySchool(this.props.school.id);
  }

  render() {
    var months = ["January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "October", "November", "December"].map(function(month, index) {
                    return ( <option key={index} value={index + 1}>{month}</option> );
                  });

    return (

      <form className='work-experience-form' onSubmit={this.handleSubmit}>
        <ul>
          <li className='work-experience-form-item'>
            <label htmlFor='school'>
              School
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="school"
              value={ this.state.school }
              onChange={ this.handleChange }
              className="one-line-input" />

          </li>

          <li className='work-experience-form-item'>
            <fieldset className='work-experience-date-range'>
              <legend>Dates Attended</legend>

              <label htmlFor='start_month'></label>
              <select
                type="date"
                id="start_month"
                value={this.state.start_month}
                onChange={ this.handleChange } >
                <option className='hidden'>Choose...</option>
                { months }
              </select>

              <label htmlFor='start_year'></label>
              <input
                type='text'
                id='start_year'
                value={ this.state.start_year }
                onChange={ this.handleChange }
                className='year'
                placeholder="Year"
                maxLength="4" />


              <label htmlFor='end_month'></label>
              <select
                type="date"
                id="end_month"
                value={ this.state.end_month }
                onChange={ this.handleChange }
                className="">
                <option className='hidden'>Month</option>
                { months }
              </select>

              <label htmlFor='end_year'></label>
              <input
                type='text'
                id='end_year'
                value={ this.state.end_year }
                onChange={ this.handleChange }
                className='year'
                placeholder="Year"
                maxLength="4" />
            </fieldset>
          </li>
          <li className='work-experience-form-item'>
            <label htmlFor='degree'>
              Degree
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="degree"
              value={ this.state.degree }
              onChange={ this.handleChange }
              className="one-line-input" />
          </li>
          <li className='work-experience-form-item'>
            <label htmlFor='field'>
              Field of Study
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="field"
              value={this.state.field}
              onChange={ this.handleChange }
              className="one-line-input" />
          </li>

          <li className='work-experience-form-item'>
            <label htmlFor='grade'>
              Grade
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="grade"
              value={this.state.grade}
              onChange={ this.handleChange }
              className="one-line-input" />
          </li>

          <li className='work-experience-form-item'>
            <label htmlFor='extracurriculars'>
              Activities and Societies
            </label>
            <textarea
              id="extracurriculars"
              rows="3"
              cols="60"
              value={ this.state.extracurriculars }
              onChange={ this.handleChange }
              placeholder=""
              className="multiline-input" />
          </li>

          <li className='work-experience-form-item'>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              id="description"
              rows="6"
              cols="60"
              value={ this.state.description }
              onChange={ this.handleChange }
              placeholder=""
              className="multiline-input" />
          </li>
        </ul>
        <div className='background-actions'>
          <button type="submit">Save</button>
          <button type="button" onClick={this.props.close}>Cancel</button>
          <button type="button" onClick={this.destroy}>Remove this Position</button>
        </div>
      </form>
    );
  }
}

SchoolForm.defaultProps = { school: {} };
