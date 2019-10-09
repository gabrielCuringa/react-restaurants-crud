import * as api from "./api.js";

export async function getRestaurants(page, pagesize, name = "") {
  console.log("dans get restaurants");
  let result = {};
  try {
    result = await api.get("/api/restaurants");
  } catch (e) {
    throw e;
  }

  return result;
  // return Promise((resolve, reject) => {
  //   let urlRestaurants =
  //     "http://localhost:8080/api/restaurants?page=" +
  //     page +
  //     "&pagesize=" +
  //     pagesize +
  //     "&name=" +
  //     name;

  //   fetch(urlRestaurants, {
  //     method: "get"
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(json => {
  //       let returnData = {
  //         msg: json.msg,
  //         data: json.data,
  //         count: json.count
  //       };
  //       resolve(returnData);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
}
