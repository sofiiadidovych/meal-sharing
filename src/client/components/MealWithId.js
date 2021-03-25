import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageStructure from "./PageStructure";

function MealWithId({ meals }) {
  const params = useParams();
  console.log(params.id);
  const meal = meals.find((meal) => meal.idmeals === Number(params.id));

  return (
    <PageStructure>
      <div>
        {!meal ? (
          <div>Not found</div>
        ) : (
          <div>
            {meal.title} - {meal.price}
            <p>Maximum reservation capacity: {meal.max_reservations}</p>
                <p>Created: {meal.created_date}</p>
          </div>
        )}
        <Link to="/meals">Go back</Link>
      </div>
    </PageStructure>
  );
}

export default MealWithId;
