const express = require("express");
const { where, leftJoin } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // all meals
    const meals = await knex("meals")
    response.send(meals);

    // filtered by price, title, createdAfter
    const maxPrice = request.query.maxPrice != undefined ? request.query.maxPrice : 999999999999;
    const title = request.query.title != undefined ? request.query.title : '';
    const createdAfter = new Date(request.query.createdAfter);
    //const availableReservations = request.query.availableReservations ? true : false

    const filteredMeals = await knex("meals")
      .where('price', '<=', maxPrice)
      .where('title', 'like', `%${title}%`)
      .where('created_date', '>', createdAfter)
      response.send(filteredMeals);

    // const mealsWithAvailableReservation = await knex("meals")
    //   leftJoin('reservations', {'meal_id' : 'meal.idmeals'})
    //   .select()
    //   .where('number_of_guests', '<', 'max_reservations')
    //   response.send(mealsWithAvailableReservation)
    // by limit
    const limit = parseInt(request.query.limit)
    const limitedMeals = await knex("meals").limit(limit)
    response.send(limitedMeals)

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
      .update({ title: request.body.title, number_of_guests: request.body.number_of_guests });
    response.status(202).json('Success');
  } catch (error) {
    throw error;
  }
})

router.delete("/:id", async (request, response) => {
  try {
    await knex("meals")
      .where({ idmeals : parseInt(request.params.id) })
      .delete()
      response.json('Deleted')
  } catch (error) {
    throw error;
  }
});

module.exports = router;
