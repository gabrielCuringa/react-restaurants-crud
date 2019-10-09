let BASE_URL = "http://localhost:8080";
export function get(url) {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: "get"
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        return resolve(json);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
