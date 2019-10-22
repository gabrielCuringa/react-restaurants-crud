import * as api from "./api.js";

export async function getRestaurants(page, pagesize, name = "") {
  console.log("dans get restaurants");
  let result = {};
  try {
    result = await api.get("/api/restaurants?page=" + page);
  } catch (e) {
    throw e;
  }

  return result;
}

export async function addRestaurant(formData) {
  console.log("dans post restaurant");
  let result = {};
  try {
    result = await api.post("/api/restaurants", formData);
  } catch (e) {
    throw e;
  }
  return result;
}

export async function updateRestaurant(id, formData) {
  console.log("dans put restaurant");
  let result = {};
  try {
    result = await api.put("/api/restaurants/" + id, formData);
  } catch (e) {
    throw e;
  }
  return result;
}
