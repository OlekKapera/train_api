'use strict';

const axios = require('axios').default;

const host = "https://e9qx2wlhrh.execute-api.us-east-1.amazonaws.com/dev";

async function getLatestDataFromDB(stationId) {
  let response = await axios.get(host + stationId);
  return response;
}

exports.http = async (request, response) => {
  let res = await getLatestDataFromDB(request.path);
  const data = res.data;
  if (data.Count == 0) {
    response.status(404).send({ message: "Station not found" });
    return;
  }

  const distance = data.Items[0].device_data.M.distance.N;
  if (distance >= 3) {
    response.status(200).send({ hasObstacle: false });
    return;
  }

  response.status(200).send({ hasObstacle: true });
};

exports.event = (event, callback) => {
  callback();
};
