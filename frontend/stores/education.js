const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/appDispatcher');
export const EducationStore = new Store(AppDispatcher);

const EducationConstants = require('../constants/work');

var _workExperiences = [];

EducationStore.all = function() {
  return _workExperiences;
};

EducationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case EducationConstants.EMAIL_UNIQUE:
      receiveExperiences(payload.experiences);
      EducationStore.__emitChange();
      break;
  }
};

const receiveExperiences = experiences => {
  _workExperiences = experiences.work_experiences;
};
