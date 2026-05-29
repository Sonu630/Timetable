import API from "./axios";

export const enrollCourse = (
  data
) => API.post("/enroll", data);

export const getMyEnrollments =
  () =>
    API.get("/my-enrollments");