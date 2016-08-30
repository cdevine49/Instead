import { receiveExperiences } from '../actions/work';

export const createExperience = data => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "POST",
      url: "/api/work_experiences/",
      dataType: "json",
      data: data,
      success: function (experience) {
        // WorkActions.receiveExperience(experience);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const fetchExperiences = id => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "GET",
      url: "/api/work_experiences/",
      dataType: "json",
      success: function (experience) {
        receiveExperiences(experience);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const editExperience = (id, data) => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "PATCH",
      url: "/api/work_experiences/" + id,
      dataType: "json",
      data: data,
      success: function (experience) {
        // WorkActions.receiveExperience(experience);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const destroyExperience = (id, data) => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "DELETE",
      url: "/api/work_experiences/" + id,
      dataType: "json",
      data: data,
      success: function (experience) {
        // WorkActions.receiveExperience(experience);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};
