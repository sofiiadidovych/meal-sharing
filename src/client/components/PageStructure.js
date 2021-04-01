import React from "react";
import { Link } from "react-router-dom";
import "./ComponentsStyle.css";
import logo from "../assets/images/hyf.png";

function PageStructure(props) {
  return (
    <>
      <header className="header">
        <h1>Meal-sharing</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meals">Meals</Link>
            </li>
            <li>
              <Link to="/">Create your meal</Link>
            </li>
            <li>
              <Link to="/">Make a reservation</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="content">{props.children}</section>
      <footer className="footer">
        <img src={logo} alt="logo" />
        <p>created by Sofiia</p>
      </footer>
    </>
  );
}

export default PageStructure;
