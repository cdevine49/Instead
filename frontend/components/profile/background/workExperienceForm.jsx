import React from 'react';
import { createExperience, editExperience, destroyExperience } from '../../../utils/workExperience';

export default class WorkExperienceForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      company: this.props.workExperience.company,
      position: this.props.workExperience.position,
      start_month: this.props.workExperience.start_month,
      start_year: this.props.workExperience.start_year,
      end_month: this.props.workExperience.end_month,
      end_year: this.props.workExperience.end_year,
      location: this.props.workExperience.location,
      description: this.props.workExperience.description,
      isCurrentJob: !!this.props.workExperience.endYear
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleCheck(e) {
    if (e.target.checked) {
      $('#end').addClass("hidden");
      this.setState({ end_month: null, end_year: null });
    } else {
      $('#end').removeClass("hidden");
    }
  }

  handleSubmit() {
    if (!this.props.workExperience.id) {
      createExperience({ work_experience: this.state });
    } else {
      editExperience(this.props.workExperience.id, { work_experience: this.state });
    }
  }

  destroy() {
    destroyExperience(this.props.workExperience.id, { work_experience: this.state });
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
            <label htmlFor='company'>
              Company Name
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="company"
              value={ this.state.company }
              onChange={ this.handleChange }
              className="one-line-input" />

          </li>
          <li className='work-experience-form-item'>
            <label htmlFor='position'>
              Title
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="position"
              value={ this.state.position }
              onChange={ this.handleChange }
              className="one-line-input" />
          </li>
          <li className='work-experience-form-item'>
            <label htmlFor='location'>
              Location
              <span title="Required" className='required'>*</span>
            </label>
            <input
              type="text"
              id="location"
              value={this.state.location}
              onChange={ this.handleChange }
              className="one-line-input" />
          </li>

          <li className='work-experience-form-item'>
            <fieldset className='work-experience-date-range'>
              <legend>Time Period</legend>

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

                <label htmlFor='isCurrentJob'>
                I currently work here
              </label>
                <input
                  type="checkbox"
                  id="isCurrentJob"
                  checked={ this.state.endCheckbox }
                  onChange={ this.handleCheck }
                  className="" />
            </fieldset>
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
          <button type="submit" className='submit'>Save</button>
          <button type="button" className='cancel' onClick={this.props.close}>Cancel</button>
          <button type="button" className='delete background-delete' onClick={this.destroy}>Remove this Position</button>
        </div>
      </form>
    );
  }
}

WorkExperienceForm.defaultProps =  { workExperience: {} };
