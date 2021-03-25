import React from "react";
import { Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageTitle from "./PageTitle";
import PageStructure from "./PageStructure";

function MealsContainer({ meals }) {
  return (
    <PageStructure>
      <PageTitle />
      <section className="home-meals">
        <ul>
          {meals.map((meal) => {
            return (
              <li key={meal.idmeals}>
                <h4>
                  {meal.title} - {meal.price} DKK
                </h4>
                <Link to={`/meals/${meal.idmeals}`}>Details</Link>
              </li>
            );
          })}
        </ul>
      </section>
      <Link to="/">Go back home</Link>
    </PageStructure>
  );
}

export default MealsContainer;
