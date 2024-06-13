import axios from "axios";
import {
  FETCH_DOGS_SUCCESS,
  FILTER_DOGS,
  SET_CURRENT_PAGE,
  FETCH_DOG_DETAILS_SUCCESS,
  CREATE_DOG_SUCCESS,
  FETCH_TEMPERAMENTS_REQUEST,
  FETCH_TEMPERAMENTS_SUCCESS,
  FETCH_TEMPERAMENTS_FAIL,
  SET_ORIGIN_FILTER,
  SET_TEMPERAMENT_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT
} from "./action-types";

export const fetchDogs = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: FETCH_DOGS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching dogs data:", error);
  }
};

export const fetchDogDetails = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    dispatch({ type: FETCH_DOG_DETAILS_SUCCESS, payload: response.data[0] });
  } catch (error) {
    console.error("Error fetching dog details:", error);
  }
};

export const createDog = (dogData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/dogs", dogData);
    dispatch({
      type: CREATE_DOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error creating dog:", error.response.data);
  }
};

export const fetchTemperaments = () => async (dispatch) => {
  dispatch({ type: FETCH_TEMPERAMENTS_REQUEST });
  try {
    const response = await axios.get("http://localhost:3001/temperaments");
    dispatch({
      type: FETCH_TEMPERAMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('Error fetching temperaments',error)
  }
};

export const filterDogs = (searchTerm) => {
  return { type: FILTER_DOGS, searchTerm };
};

export const setCurrentPage = (pageNumber) => {
  return { type: SET_CURRENT_PAGE, pageNumber };
};

export const setOriginFilter = (origin) => ({
  type: SET_ORIGIN_FILTER,
  payload: origin
});

export const setTemperamentFilter = (temperament) => (
  {
  type: SET_TEMPERAMENT_FILTER,
  payload: temperament
});

export const orderByName = (order) => {
  return { type: ORDER_BY_NAME, payload: order };
};

export const orderByWeight = (order) => {
  return { type: ORDER_BY_WEIGHT, payload: order };
};
