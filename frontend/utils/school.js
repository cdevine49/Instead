import { receiveEducation, removeSchool } from '../actions/education';

export const createSchool = data => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "POST",
      url: "/api/educations/",
      dataType: "json",
      data: data,
      success: function (education) {
        // WorkActions.receiveSchool(education);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const fetchEducation = user_id => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "GET",
      url: "/api/educations/",
      dataType: "json",
      data: {user_id: user_id},
      success: function (education) {
        receiveEducation(education);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const editSchool = (id, data) => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "PATCH",
      url: "/api/educations/" + id,
      dataType: "json",
      data: data,
      success: function (education) {
        // WorkActions.receiveSchool(education);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};

export const destroySchool = id => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "DELETE",
      url: "/api/educations/" + id,
      dataType: "json",
      success: function (school) {
        removeSchool(school);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};
