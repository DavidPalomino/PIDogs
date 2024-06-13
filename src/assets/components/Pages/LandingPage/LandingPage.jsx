import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";
export default function LandingPage() {
  return (
    <div className={style.landing}>
      <h1 className={style.title}>Welcome My Friend</h1>
      <NavLink to={"home"}>
        <button className={style.button}>Enter</button>
      </NavLink>
    </div>
  );
}
