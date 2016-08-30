var AppDispatcher = require('../dispatcher/appDispatcher');
import EducationConstants from '../constants/education';

export const receiveEducation = education => {
  var action = {
    actionType: EducationConstants.RECEIVE_EDUCATION,
    education: education
  };

  AppDispatcher.dispatch(action);
};

export const removeSchool = school => {
  var action = {
    actionType: EducationConstants.DESTROY_SCHOOL,
    school: school
  };

  AppDispatcher.dispatch(action);
};
