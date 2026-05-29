import API from "./axios";

export const getPolls = () =>
  API.get("/polls");

export const createPoll = (
  data
) => API.post("/polls", data);

export const votePoll = (data) =>
  API.post("/polls/vote", data);

export const getPollResults = (
  pollId
) =>
  API.get(
    `/poll-results/${pollId}`
  );