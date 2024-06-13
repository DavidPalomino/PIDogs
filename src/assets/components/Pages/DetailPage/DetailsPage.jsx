import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDogDetails } from "../../../../redux/actions";
import style from "./DetailsPage.module.css";
import { NavLink } from "react-router-dom";

export default function DetailPage() {
  const { dogName } = useParams();
  const dispatch = useDispatch();
  const dogData = useSelector((state) => state.dogs.dogDetails);
  const [isLoading, setIsLoading] = useState(true);
  const uuidValidationRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  useEffect(() => {
    const originalDogName = dogName.replace(/-/g, " ");
    setIsLoading(true);
    dispatch(fetchDogDetails(originalDogName))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, dogName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dogData) {
    return <div>No data found.</div>;
  }


  const { id, name, image, lifeSpan, temperament, weight, height } = dogData;

  
  if (uuidValidationRegex.test(`${id}`)) {
    
    const temperamentsDBStr = dogData.temperament.map(t => t.name).join(", ");
    return (
    <>
    <NavLink className={style.navLink} to={"/home"}>
          <button type="button" className={style.backButton}>
            Back to Home
          </button>
    </NavLink>
      <div className={style.detailsContainer}>
        <h2>{name}</h2>
        <img src={image} alt={`Imagen de ${name}`} className={style.dogImage} />
        <p>
          <strong>Temperaments:</strong> {temperamentsDBStr}
        </p>
        <p>
          <strong>Weight:</strong> {weight}
        </p>
        <p>
          <strong>Height:</strong> {height}
        </p>
        <p>
          <strong>Life Span: </strong>{lifeSpan}
        </p>
      </div>
    </>
    );
  } 
  
  const temperamentsStr = temperament ? temperament.join(", ") : "";
  const weightStr = `${weight.imperial} lbs (${weight.metric} kg)`;
  const heightStr = `${height.imperial} inches (${height.metric} cm)`;

  return (
<>
  <NavLink className={style.navLink} to={"/home"}>
    <button type="button" className={style.backButton}>
      Back to Home
    </button>
  </NavLink>
  <div className={style.detailsContainer}>
    <h2>{name}</h2>
    <img src={image} alt={`Imagen de ${name}`} className={style.dogImage} />
    <p>
      <strong>Temperaments:</strong> {temperamentsStr}
    </p>
    <p>
      <strong>Weight:</strong> {weightStr}
    </p>
    <p>
      <strong>Height:</strong> {heightStr}
    </p>
    <p>
      <strong>Life Span:</strong> {lifeSpan}
    </p>
  </div>
</>
  );
}
