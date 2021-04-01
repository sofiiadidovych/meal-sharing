import React from "react";
import "./ComponentsStyle.css";
import PageTitle from "./PageTitle";
import PageStructure from "./PageStructure";
import MealItem from "./MealItem";

function Home({ meals }) {
  return (
    <PageStructure>
      <PageTitle />
      <section className="home">
        <ul>
          {meals.map((meal) =>
            <MealItem key={meal.idmeals} title={meal.title}></MealItem>
          )}
        </ul>
      </section>
    </PageStructure>
  );
}

export default Home;
