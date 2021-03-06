import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../ComponentsStyle.css";
import "./MealWithId.css";
import PageStructure from "../PageStructure";

export function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
}

function MealWithId({ meals }) {
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [availableReservations, setAvailableReservations] = useState(0);
  const params = useParams();
  const meal = meals.find((meal) => meal.id === Number(params.id));

  useEffect(() => {
    fetch(`/api/meals/availableReservations/${Number(params.id)}`)
      .then((response) => response.json())
      .then((data) => setAvailableReservations(Number(data.availableReservations)));
  }, []);

  const addReservation = (event) => {
    event.preventDefault();
    if (name === "") {
      alert("Please tell us your name");
      return;
    }
    if (phoneNumber === "") {
      alert("Please tell us your phone number");
      return;
    }
    if (email === "") {
      alert("Please tell us your email");
      return;
    }
    const reservation = {
      meal_id: meal.id,
      guests: guests,
      name: name,
      phone_number: phoneNumber,
      email: email,
      created_date: getCurrentDate(),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    };

    fetch("/api/reservations/", requestOptions);
    setGuests(1);
    setName("");
    setPhoneNumber("");
    setEmail("");
    setAvailableReservations(availableReservations - guests);
  };

  return (
    <PageStructure>
      {!meal ? (
        <div>Not found</div>
      ) : (
        <div className="reservation">
          <p>{meal.title} - {meal.price}</p>
          <p>Maximum reservation capacity: {meal.number_of_guests}</p>
          <p>Available: {availableReservations}</p>
          <form onSubmit={addReservation}>
            <section className="reservation_form">
              <p>Make a reservation</p>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label htmlFor="reservation">For number of guests</label>
              <input
                type="number"
                min="1"
                max={availableReservations}
                id="reservation"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              ></input>
              <button disabled={guests > availableReservations}>Add</button>
            </section>
          </form>
        </div>
      )}
      <Link className="back_links" to="/meals">Go back</Link>
    </PageStructure>
  );
}

export default MealWithId;
