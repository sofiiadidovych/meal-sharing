const express = require("express");
const { where, leftJoin } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const reviews = await knex("reviews");
        response.send(reviews);
    } catch (error) {
        throw error;
    }
});

router.post("/", async (request, response) => {
    try {
        await knex("reviews").insert(request.body).then(selected => {
            response.status(201).json(selected[0]);
        })
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reviewsWithId = await knex("reviews")
            .where({ id: parseInt(request.params.id) });
        response.send(reviewsWithId)
    } catch (error) {
        throw error;
    }
});

router.put("/:id", async (request, response) => {
    try {
        await knex("reviews")
            .where({ id: parseInt(request.params.id) })
            .update({
                title: request.body.title,
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
        await knex("reviews")
            .where({ id: parseInt(request.params.id) })
            .delete()
        response.json("Deleted")
    } catch (error) {
        throw error;
    }
});

module.exports = router;