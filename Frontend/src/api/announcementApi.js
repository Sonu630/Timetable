import API from "./axios";

export const createAnnouncement =
  (data) =>
    API.post(
      "/announcements",
      data
    );

export const getAnnouncements =
  () =>
    API.get(
      "/announcements"
    );