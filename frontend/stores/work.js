const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/appDispatcher');
export const WorkStore = new Store(AppDispatcher);

import WorkConstants from '../constants/work';

var _workExperiences = [];

WorkStore.all = function() {
  return _workExperiences;
};

WorkStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WorkConstants.WORK_EXPERIENCES:
      receiveExperiences(payload.experiences);
      WorkStore.__emitChange();
      break;
  }
};

const receiveExperiences = experiences => {
  _workExperiences = experiences.work_experiences;
};
