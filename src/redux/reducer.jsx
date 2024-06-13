import { combineReducers } from "redux";
import {
  FETCH_DOGS_SUCCESS,
  FILTER_DOGS,
  SET_CURRENT_PAGE,
  FETCH_DOG_DETAILS_SUCCESS,
  CREATE_DOG_SUCCESS,
  FETCH_TEMPERAMENTS_SUCCESS,
  SET_ORIGIN_FILTER,
  SET_TEMPERAMENT_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "./action-types";

const initialState = {
  allDogs: [],
  filteredDogs: [],
  filteredDogsBackup: [],
  filteredDogsApi: [],
  filteredDogsDb: [],
  currentPage: 1,
  postPerPage: 15,
  dogDetails: null,
  data: [],
  originFilter: "all",
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOGS_SUCCESS:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
        filteredDogsBackup: action.payload,
        filteredDogsApi: action.payload,
        filteredDogsDb: action.payload
      };
    case FILTER_DOGS:
      const filtered = state.allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return { ...state, filteredDogs: filtered, currentPage: 1 };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.pageNumber };
    case FETCH_DOG_DETAILS_SUCCESS:
      return { ...state, dogDetails: action.payload };
    case CREATE_DOG_SUCCESS:
      return {
        ...state,
      };
    case FETCH_TEMPERAMENTS_SUCCESS:
      return { ...state, data: action.payload };

    case SET_ORIGIN_FILTER:
      let originFilteredDogs;
      console.log(state.filteredDogsBackup)
      if (action.payload === "all") {
        originFilteredDogs = state.filteredDogsBackup;
      } else if (action.payload === "api") {
        originFilteredDogs = state.filteredDogsApi.filter(
          (dog) => typeof dog.id === "number"
        );
      } else if (action.payload === "db") {
        originFilteredDogs = state.filteredDogsDb.filter(
          (dog) => typeof dog.id === "string"
        );
      }
      return {
        ...state,
        filteredDogs: originFilteredDogs,
        currentPage: 1,
      };

    case SET_TEMPERAMENT_FILTER:
      if(action.payload === "All Temperaments"){
        return {
            ...state,
            filteredDogs: [...state.allDogs],
            filteredDogsBackup: [...state.allDogs],
            filteredDogsApi: [...state.allDogs],
            filteredDogsDb: [...state.allDogs]
        }
    }

      let TemperamentArray = [...state.allDogs].filter((dog)=> {
        if (dog.temperament.includes(action.payload)) {
            return dog
        }
    })
    const dogFromDB = state.allDogs.filter(
      (dog) => typeof dog.id === "string"
    );
    const dogWithTemperamentNames = dogFromDB.map((dog) => ({
      ...dog,
      temperament: dog.temperament.map((temp) => temp.name),
    }));
    const dogFilteredDb =
      action.payload == 'All Temperaments'
        ? dogWithTemperamentNames
        : dogWithTemperamentNames.filter((dog) =>
            dog.temperament?.includes(action.payload)
          );
          console.log(dogWithTemperamentNames)
    return {
        ...state,
        filteredDogs: [...TemperamentArray, ...dogFilteredDb],
        filteredDogsBackup: [...TemperamentArray, ...dogFilteredDb],
        filteredDogsApi: [...TemperamentArray],
        filteredDogsDb: [...dogFilteredDb],
        currentPage: 1
    }
    case ORDER_BY_NAME:
      let sortedByName = [...state.filteredDogs].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return action.payload === "asc" ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return action.payload === "asc" ? 1 : -1;
        return 0;
      });
      return { ...state, filteredDogs: sortedByName };

    case ORDER_BY_WEIGHT:
      const getMaxWeight = (weightStr) => {
        const weightRegex = /\d+\.?\d*/g;
        let weights = weightStr.match(weightRegex);
        if (!weights) return 0;

        weights = weights.map(Number);
        return Math.max(...weights);
      };
      const sortedByWeight = [...state.filteredDogs].sort((a, b) => {
        const weightA = getMaxWeight(a.weight.imperial || a.weight);
        const weightB = getMaxWeight(b.weight.imperial || b.weight);

        return action.payload === "asc" ? weightA - weightB : weightB - weightA;
      });
      return { ...state, filteredDogs: sortedByWeight };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dogs: dogReducer,
});

export default rootReducer;
