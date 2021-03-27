import React from "react";
import { Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageTitle from "./PageTitle";
import PageStructure from "./PageStructure";

function Home({ meals }) {
  return (
    <PageStructure>
      <PageTitle />
      <section className="home">
        <ul>
          {meals.map((meal) => (
            <li key={meal.idmeals}>
              <h4>
                {meal.title} - {meal.price} DKK
              </h4>
            </li>
          ))}
        </ul>
      </section>
      <Link to="/meals">Edit meals</Link>
    </PageStructure>
  );
}

export default Home;
