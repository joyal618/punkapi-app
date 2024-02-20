import axios, { AxiosResponse } from "axios";
import { FetchDataProps } from "./interface";

const fetchData = async ({ highABV, searchText, page }: FetchDataProps) => {
  try {
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?${`page=${
        page.skip / page.take + 1
      }&per_page=${page.take}`}${highABV ? "&abv_gt=8" : ""}${
        searchText ? `&beer_name=${searchText}` : ""
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while fetching data: " + error.message);
  }
};

// Axios interceptor to check rate limit headers
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const rateLimitLimit = response.headers["x-ratelimit-limit"];
    const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
    console.log("Rate limit limit:", rateLimitLimit);
    console.log("Rate limit remaining:", rateLimitRemaining);
    return response;
  },
  (error) => {
    alert(error);
    return Promise.reject(error);
  }
);

export default fetchData;
