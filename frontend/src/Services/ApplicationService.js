/* eslint-disable class-methods-use-this */
const API_BASE_URL = "http://localhost:3001/";

class ApplicationService {
  postApp(newApp) {
    return fetch("http://localhost:3001/users/jobs", {
      method: "POST",
      body: new URLSearchParams(newApp),
    });
  }

  getApps(userId) {
    return fetch(`http://localhost:3001/users/jobs/${userId}`, {
      method: "GET",
    });
  }
}

export default new ApplicationService();
