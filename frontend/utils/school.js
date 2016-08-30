
export const createSchool = data => {
  return new Promise( function(resolve, reject) {
    $.ajax({
      type: "POST",
      url: "/api/educations/",
      dataType: "json",
      data: data,
      success: function (experience) {
        debugger
        // WorkActions.receiveSchool(experience);
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
      success: function (experience) {
        // WorkActions.receiveSchool(experience);
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
      success: function (experience) {
        // WorkActions.receiveSchool(experience);
        resolve();
      },
      error: function (response) {
        reject(response);
      },
    });
  });
};
