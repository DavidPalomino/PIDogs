import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, fetchTemperaments } from "../../../../redux/actions";
import { validateDogForm } from "./validations";
import style from "./FormPage.module.css";
import { NavLink } from "react-router-dom";

export default function FormPage() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.dogs.data || []);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: "",
  });

  const [minMax, setMinMax] = useState({
    height: { min: 0, max: 0 },
    weight: { min: 0, max: 0 },
    lifeSpan: { min: 0, max: 0 },
  });

  useEffect(() => {
    dispatch(fetchTemperaments());
  }, [dispatch]);

  const setPhysicalAttributes = (currentMinMax) => {
    const height = `${currentMinMax.height.min} - ${currentMinMax.height.max} inches / ${(currentMinMax.height.min * 2.54).toFixed(2)} - ${Math.round(currentMinMax.height.max * 2.54).toFixed(2)} cm`;
    const weight = `${currentMinMax.weight.min} - ${currentMinMax.weight.max} lb / ${(currentMinMax.weight.min / 2.205).toFixed(3)} - ${Math.round(currentMinMax.weight.max / 2.205)} kg`;
    const lifeSpan = `${currentMinMax.lifeSpan.min} - ${currentMinMax.lifeSpan.max} years`;

    setFormData((prevFormData) => ({
      ...prevFormData,
      height: height,
      weight: weight,
      lifeSpan: lifeSpan,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validateDogForm({ ...formData, [name]: value }));
  };

  const handleInputNumberChange = (prop, e) => {
    const { name, value } = e.target;
    const newMinMax = {
      ...minMax,
      [name]: {
        ...minMax[name],
        [prop]: value,
      },
    };
    setMinMax(newMinMax);
    const updatedFormData = { ...formData, [name]: value };
    setErrors(validateDogForm(updatedFormData, newMinMax));
    setPhysicalAttributes(newMinMax);
  };

  const handleTemperamentChange = (e) => {
    const { value, checked } = e.target;
    let updatedTemperaments = [...formData.temperaments];
    if (checked) {
      updatedTemperaments.push(value);
    } else {
      updatedTemperaments = updatedTemperaments.filter(
        (temp) => temp !== value
      );
    }
    setFormData({
      ...formData,
      temperaments: updatedTemperaments,
    });
    setErrors(
      validateDogForm({ ...formData, temperaments: updatedTemperaments })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      dispatch(createDog(formData));
      alert("Creado con exito");
      setFormData({
        name: "",
        image: "",
        temperaments: [],
      });
      setMinMax({
        height: {min: 0, max: 0},
        weight: {min: 0, max: 0},
        lifeSpan: {min: 0, max: 0}
      })
      setErrors({
        name: "",
        image: "",
        temperaments: "",
      });
    } else {
      alert("Completa todo che");
    }
  };

  const danger = (prop) => {
    return errors[prop] ? (
      <p className={style.errorText}>{errors[prop]}</p>
    ) : null;
  };

  return (
    <>
        <NavLink to={"/home"}>
          <button type="button" className={style.backButton}>
            Back to Home
          </button>
        </NavLink>
      <div className={style.createDogForm}>
        <h2 className={style.formTitle}>Create a New Dog</h2>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="name" className={style.formLabel}>
              Name:
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={style.formInput}
            />
            {danger("name")}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="image" className={style.formLabel}>
              Image URL:
            </label>
            <input
              name="image"
              type="text"
              value={formData.image}
              onChange={handleInputChange}
              className={style.formInput}
            />
            {danger("image")}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="height" className={style.formLabel}>
              Height:
            </label>
            <label>Min</label>
            <input
              name="height"
              type="number"
              min={1}
              max={200}
              value={minMax.height.min}
              onChange={(e) => handleInputNumberChange("min", e)}
              className={style.formInput}
            />
            <label>Max</label>
            <input
              name="height"
              type="number"
              min={1}
              max={200}
              value={minMax.height.max}
              onChange={(e) => handleInputNumberChange("max", e)}
              className={style.formInput}
            />
            {danger("height")}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="weight" className={style.formLabel}>
              Weight:
            </label>
            <label>Min</label>
            <input
              name="weight"
              type="number"
              min={1}
              max={200}
              value={minMax.weight.min}
              onChange={(e) => handleInputNumberChange("min", e)}
              className={style.formInput}
            />
            <label>Max</label>
            <input
              name="weight"
              type="number"
              min={1}
              max={200}
              value={minMax.weight.max}
              onChange={(e) => handleInputNumberChange("max", e)}
              className={style.formInput}
            />
            {danger("weight")}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="lifeSpan" className={style.formLabel}>
              Life Span:
            </label>
            <label>Min</label>
            <input
              name="lifeSpan"
              type="number"
              min={1}
              max={200}
              value={minMax.lifeSpan.min}
              onChange={(e) => handleInputNumberChange("min", e)}
              className={style.formInput}
            />
            <label>Max</label>
            <input
              name="lifeSpan"
              type="number"
              min={1}
              max={200}
              value={minMax.lifeSpan.max}
              onChange={(e) => handleInputNumberChange("max", e)}
              className={style.formInput}
            />
            {danger("lifeSpan")}
          </div>

          <fieldset className={style.temperamentFieldset}>
            <legend className={style.temperamentLegend}>Temperaments</legend>
            {danger("temperaments")}
            <div className={style.temperamentCheckboxes}>
              {temperaments.map((temp) => (
                <div key={temp.UUID} className={style.temperamentCheckbox}>
                  <label className={style.temperamentLabel}>
                    <input
                      type="checkbox"
                      name="temperaments"
                      value={temp.name}
                      onChange={handleTemperamentChange}
                      checked={formData.temperaments.includes(temp.name)}
                      className={style.temperamentInput}
                    />
                    {temp.name}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          <button type="submit" className={style.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>    
  );
}
