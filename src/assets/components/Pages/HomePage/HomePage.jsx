import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./HomePage.module.css";
import DogList from "./Pagination/DogList";
import { Pagination } from "./Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import {
  fetchDogs,
  filterDogs,
  setCurrentPage,
  fetchTemperaments,
  setOriginFilter,
  setTemperamentFilter,
  orderByName, 
  orderByWeight 
} from "../../../../redux/actions";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
  }, [dispatch]);

  const { filteredDogs, currentPage, postPerPage, data } =
    useSelector((state) => state.dogs);
  const [selectedTemperament, setSelectedTemperament] = useState("all");


  const onSearch = (searchTerm) => {
    dispatch(filterDogs(searchTerm));
  };

  const handleFilterByOrigin = (origin) => {
    dispatch(setOriginFilter(origin));
    dispatch(setCurrentPage(1));
  };

  const handleFilterByTemperament = (temperament) => {
    dispatch(setTemperamentFilter(temperament));
    dispatch(setCurrentPage(1));
  };

  const handleOrderByName = (order) => {
    dispatch(orderByName(order));
    dispatch(setCurrentPage(1));
  };

  const handleOrderByWeight = (order) => {
    dispatch(orderByWeight(order));
    dispatch(setCurrentPage(1));

  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className={style.HomePage}>
      <SearchBar onSearch={onSearch} />
      <div className={style.FilterControls}>
        <button
          className={style.button}
          onClick={() => handleFilterByOrigin("all")}
        >
          All Dogs
        </button>
        <button
          className={style.button}
          onClick={() => handleFilterByOrigin("api")}
        >
          API Dogs
        </button>
        <button
          className={style.button}
          onClick={() => handleFilterByOrigin("db")}
        >
          DB Dogs
        </button>
        <button className={style.button} onClick={() => handleOrderByName('asc')}>Order by Name Asc</button>
      <button className={style.button} onClick={() => handleOrderByName('desc')}>Order by Name Desc</button>
      <button className={style.button} onClick={() => handleOrderByWeight('asc')}>Order by Weight Asc</button>
      <button className={style.button} onClick={() => handleOrderByWeight('desc')}>Order by Weight Desc</button>
        <select
          className={style.select}
          value={selectedTemperament}
          onChange={(e) => {
            setSelectedTemperament(e.target.value);
            handleFilterByTemperament(e.target.value);
          }}
        >
          <option>All Temperaments</option>
          {data.map((temp) => (
            <option key={temp.UUID} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <DogList dogsData={currentDogs} />
      <Pagination
        totalPost={filteredDogs.length}
        postPerPage={postPerPage}
        setCurrentPage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
        currentPage={currentPage}
      />
    </div>
  );
}
