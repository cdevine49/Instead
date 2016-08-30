const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/appDispatcher');
export const EducationStore = new Store(AppDispatcher);

import EducationConstants from '../constants/education';

var _education = [];

EducationStore.all = function() {
  return _education;
};

EducationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case EducationConstants.RECEIVE_EDUCATION:
      receiveEducation(payload.education);
      break;
    case EducationConstants.RECEIVE_SCHOOL:
      addSchool(payload.school);
      break;
    case EducationConstants.UPDATE_SCHOOL:
      updateSchool(payload.school);
      break;
    case EducationConstants.DESTROY_SCHOOL:
      removeSchool(payload.school);
      break;
  }
};

const addSchool = school => {

  EducationStore.__emitChange();
};

const receiveEducation = education => {
  _education = education.educations;
  EducationStore.__emitChange();
};

const removeSchool = school => {
  const i = schoolIndex(school);
  if (i) _education.splice(i, 1);
  EducationStore.__emitChange();
};

const updateSchool = school => {
  for (var i = 0; i < _education.length; i++) {
    if (school.id === _education[i].id) {
      _education[i] = school;
    }
  }
  EducationStore.__emitChange();
};

const schoolIndex = school => {
  for (var i = 0; i < _education.length; i++) {
    if (_education[i].id === school.id) { return i; }
  }
};
