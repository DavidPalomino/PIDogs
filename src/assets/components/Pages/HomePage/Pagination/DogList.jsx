import DogCard from "./DogCard";
import style from "./DogList.module.css";
export default function DogList({ dogsData }) {
  return (
    <div className={style.DogsList}>
      {dogsData.map((dog) => {
        return (
          <DogCard
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            temperament={dog.temperament}
            weight={dog.weight}
          />
        );
      })}
    </div>
  );
}
