var AppDispatcher = require('../dispatcher/appDispatcher');
import WorkConstants from '../constants/work';

export const receiveExperiences = experiences => {
  var action = {
    actionType: WorkConstants.WORK_EXPERIENCES,
    experiences: experiences
  };

  AppDispatcher.dispatch(action);
};
