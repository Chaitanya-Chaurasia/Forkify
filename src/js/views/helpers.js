import { TIMEOUT_SEC } from './../config.js';

const timeout = function (TIMEOUT_SEC) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${TIMEOUT_SEC} seconds`)
      );
    }, TIMEOUT_SEC * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // There could be a case where the fetch() could run forever due to bad connection. So if the API is not fetched within a certain timeframe, we will send another Promise() where we will reject the Promise() and throw an error.

    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const response = await res.json();

    if (!res.ok) throw new Error(`${response.message} (${res.status})`);

    return response;
  } catch (err) {
    throw err;
  }
};
