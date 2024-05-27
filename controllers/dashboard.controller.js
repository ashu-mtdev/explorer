const axios = require("axios");
const NodeCache = require("node-cache");
const CustomResponse = require("../middleware/Responses");

const cache = new NodeCache({ stdTTL: 60 });

// Middleware to implement rate limiting
const getLatestStats = (req, res, next) => {
  const { network } = req.query;
  const cacheKey = network; // Use the request URL as the cache key

  // Check if the response is already cached
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    // If a response is found in the cache, return it
    return CustomResponse.success(res, "Last 1 minute data: ", cachedResponse);
  } else {
    // If no response is found in the cache, make the API request
    axios
      .request(`https://api.blockchair.com/${network}/stats`)
      .then(response => {
        // Cache the response for 1 minute
        cache.set(cacheKey, response.data);
        CustomResponse.success(res, "Latest Data: ", response.data);
      })
      .catch(error => {
        // Handle any errors from the API request
        console.log(error);
        CustomResponse.error(res, "Error", error);
      });
  }
};

module.exports = {
  getLatestStats
};
