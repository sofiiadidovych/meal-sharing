const express = require("express");
const { where, leftJoin } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reservations = await knex("reservations");
        response.send(reservations);
    } catch (error) {
        throw error;
    }
});

router.post("/", async (request, response) => {
    try {
        await knex("reservations").insert(request.body).then(selected => {
            response.status(201).json(selected[0]);
        })
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reservationsWithId = await knex("reservations")
            .where({ id: parseInt(request.params.id) });
        response.send(reservationsWithId)
    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        await knex("reservations")
            .where({ id: parseInt(request.params.id) })
            .update({
                number_of_guests: request.body.number_of_guests,
                meal_id: request.body.meal_id,
                created_date: request.body.created_date
            });
        response.status(202).json('Success');
    } catch (error) {
        throw error;
    }
});

router.delete("/:id", async (request, response) => {
    try {
        await knex("reservations")
            .where({ id: parseInt(request.params.id) })
            .delete()
        response.status(202).json("Deleted")
    } catch (error) {
        throw error;
    }
});

module.exports = router;