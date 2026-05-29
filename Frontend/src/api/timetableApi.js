import API from "./axios";

export const getStudentTimetable =
  () =>
    API.get(
      "/student-timetable"
    );

export const getTimetable = () =>
  API.get("/timetable");

export const createTimetable = (
  data
) => API.post("/timetable", data);

export const updateTimetable = (
  id,
  data
) =>
  API.put(`/timetable/${id}`, data);

export const deleteTimetable = (
  id
) =>
  API.delete(`/timetable/${id}`);