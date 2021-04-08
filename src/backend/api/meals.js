const express = require("express");
const { where, leftJoin } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    let availableReservations = request.query.availableReservations;
    if (availableReservations != undefined) {
      if (availableReservations == "true" || availableReservations == "false") {
        const reservationSign = availableReservations == "true" ? ">" : "<=";
        const filteredMeals = await knex
          .from("meals")
          .select("title", "number_of_guests")
          .sum("guests")
          .leftJoin("reservations", { "reservations.meal_id": "meals.id" })
          .groupBy("meals.id")
          .havingRaw(
            `number_of_guests ${reservationSign} SUM(IFNULL(reservations.guests, 0))`
          );
        response.send(filteredMeals);
      } else {
        response.status(400).send("Bad request");
      }
    } else {
      // filtered by price, title, createdAfter
      const maxPrice =
        request.query.maxPrice != undefined
          ? request.query.maxPrice
          : Number.MAX_SAFE_INTEGER;
      const title = request.query.title != undefined ? request.query.title : "";
      const createdAfter =
        request.query.createdAfter != undefined
          ? new Date(request.query.createdAfter)
          : new Date(1980, 1, 1);
      const limit =
        request.query.limit != undefined
          ? parseInt(request.query.limit)
          : Number.MAX_SAFE_INTEGER;

      const filteredMeals = await knex("meals")
        .where("price", "<=", maxPrice)
        .where("title", "like", `%${title}%`)
        .where("created_date", ">", createdAfter)
        .limit(limit);
      response.send(filteredMeals);
    }
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealWithId = await knex("meals").where({
      id: parseInt(request.params.id),
    });
    response.send(mealWithId);
  } catch (error) {
    throw error;
  }
});

router.get("/availableReservations/:id", async (request, response) => {
  try {
    const availableReservations = await knex
      .from("meals")
      .select(knex.raw("number_of_guests - SUM(IFNULL(guests, 0)) AS availableReservations"))
      .leftJoin("reservations", { "reservations.meal_id": "meals.id" })
      .whereRaw(`meals.id = ${parseInt(request.params.id)}`);
    response.send(availableReservations[0]);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  console.log(request.body);
  try {
    await knex("meals")
      .insert(request.body)
      .then((selected) => {
        response.status(201).json(selected[0]);
      });
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("meals")
      .where({ id: parseInt(request.params.id) })
      .update(request.body);
    response.status(202).json("Success");
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("meals")
      .where({ id: parseInt(request.params.id) })
      .delete();
    response.status(202).json("Deleted");
  } catch (error) {
    throw error;
  }
});

module.exports = router;
