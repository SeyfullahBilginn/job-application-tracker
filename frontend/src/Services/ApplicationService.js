/* eslint-disable class-methods-use-this */
const API_BASE_URL = "http://localhost:3001";

class ApplicationService {
  postApp(newApp) {
    console.log(newApp);
    return fetch(`${API_BASE_URL}/users/jobs`, {
      method: "POST",
      body: new URLSearchParams(newApp),
    });
  }

  getApps(userId) {
    return fetch(`${API_BASE_URL}/users/jobs/${userId}`, {
      method: "GET",
    });
  }

  deleteApp(jobId) {
    return fetch(`${API_BASE_URL}/users/jobs/${jobId}`, {
      method: "DELETE",
    });
  }
}

export default new ApplicationService();
