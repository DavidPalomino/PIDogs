import style from './DogCard.module.css'
import { useNavigate } from 'react-router-dom';


export default function DogCard({id ,name, image, temperament, weight}) {
  const uuidValidationRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  let navigate = useNavigate();

  const goToDetails = () => {
    const dogNameForUrl =  name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/details/${dogNameForUrl}`);
  };

  if (uuidValidationRegex.test(`${id}`)) {
    const temperamentsDBStr = Array.isArray(temperament) && temperament.length > 0
    ? (typeof temperament[0] === 'object' 
        ? temperament.map(t => t.name).join(", ") 
        : temperament.join(", "))
    : "";
    
    return (
      <div className={style.DogCard} onClick={goToDetails}>
        <p>{name}</p>
        <img src={image} alt={name} />
        <p>{temperamentsDBStr}</p>
        <p>{weight}</p>
      </div>
    )
  }

  const temperamentsStr = temperament ? temperament.join(", ") : "";
  const weightStr = `${weight.imperial} lbs (${weight.metric} kg)`;

  return (
    <div className={style.DogCard} onClick={goToDetails}>
        <p>{name}</p>
        <img src={image} alt={name} />
        <p>{temperamentsStr}</p>
        <p>{weightStr}</p>
    </div>
  )
}
