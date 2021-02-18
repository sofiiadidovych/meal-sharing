const express = require("express");
const { where, leftJoin } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const availableReservations = request.query.availableReservations == 'true';
    if (availableReservations) {
      const mealsWithAvailableReservation = await knex
        .from("meals")
        .select('title', 'max_reservations')
        .sum('number_of_guests')
        .leftJoin('reservations', { 'reservations.meal_id': 'meals.idmeals' })
        .groupBy('meals.idmeals')
        .havingRaw('max_reservations > SUM(IFNULL(reservations.number_of_guests, 0))');
      response.send(mealsWithAvailableReservation);
    } else {
      // filtered by price, title, createdAfter
      const maxPrice = request.query.maxPrice != undefined
        ? request.query.maxPrice
        : Number.MAX_SAFE_INTEGER;
      const title = request.query.title != undefined
        ? request.query.title
        : '';
      const createdAfter = request.query.createdAfter != undefined
        ? new Date(request.query.createdAfter)
        : new Date(1980, 1, 1);
      const limit = request.query.limit != undefined
        ? parseInt(request.query.limit)
        : Number.MAX_SAFE_INTEGER;

      const filteredMeals = await knex("meals")
        .where('price', '<=', maxPrice)
        .where('title', 'like', `%${title}%`)
        .where('created_date', '>', createdAfter)
        .limit(limit);
      response.send(filteredMeals);
    }
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealWithId = await knex("meals")
      .where({ idmeals: parseInt(request.params.id) });
    response.send(mealWithId);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  console.log(request.body)
  try {
    await knex("meals").insert(request.body).then(selected => {
      response.status(201).json(selected[0]);
    })
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    await knex("meals")
      .where({ idmeals: parseInt(request.params.id) })
      .update({ title: request.body.title, price: request.body.price });
    response.status(202).json('Success');
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    await knex("meals")
      .where({ idmeals: parseInt(request.params.id) })
      .delete()
    response.status(202).json('Deleted')
  } catch (error) {
    throw error;
  }
});

module.exports = router;
