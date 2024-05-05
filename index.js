'use strict';

const axios = require('axios').default;

const host = "https://e9qx2wlhrh.execute-api.us-east-1.amazonaws.com/dev";

async function getLatestDataFromDB(stationId) {
  let response = await axios.get(host + stationId);
  return response;
}

exports.http = async (request, response) => {
  let res = await getLatestDataFromDB(request.path);

  console.log(res.data);

  response.status(200).send(res.data);
};

exports.event = (event, callback) => {
  callback();
};
