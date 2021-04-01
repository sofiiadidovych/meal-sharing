import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ComponentsStyle.css";
import PageStructure from "./PageStructure";

export function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
};

function MealWithId({ meals }) {
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const params = useParams();
  const meal = meals.find((meal) => meal.idmeals === Number(params.id));

  const addReservation = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meal_id: meal.idmeals,
        number_of_guests: guests,
        created_date: getCurrentDate(),
      }),
    };

    fetch("http://localhost:3000/api/reservations/", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, "reservations data"));
  };

  return (
    <PageStructure>
        {!meal ? (
          <div>Not found</div>
        ) : (
          <div>
            {meal.title} - {meal.price}
            <p>Maximum reservation capacity: {meal.max_reservations}</p>
            <form onSubmit={addReservation}>
              <section className="reservation">
                <p>Make a reservation</p>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name" value={name} onChange={(event) => {setName(event.target.value)}} />
                <label htmlFor="reservation">For number of guests: </label>
                <input
                  type="number"
                  min="1"
                  max={meal.max_reservations}
                  id="reservation"
                  value={guests}
                  onChange={(event) => {
                    const value = event.target.value;
                    setGuests(value);
                  }}
                ></input>
                <button>Add</button>
              </section>
            </form>
          </div>
        )}
        <Link to="/meals">Go back</Link>
    </PageStructure>
  );
}

export default MealWithId;
