process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require('../db');

const item = {name: "Chocolate", price: 7.99 };

beforeEach(() => {
    items.push(item)
})

afterEach(() => {
    items.length = 0;
})

// GET ALL ITEMS
describe("GET /items", () => {
    test("Gets the list of items", async () => {
        const res = await request(app).get('/items');
        const {items} = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });
});


// GET single item data {item:item}
describe("GET /items/:name", () => {
    test("Gets a single item", async () => {
        const res = await request(app).get('/items/Chocolate');
        const {item: res_item} = res.body;
        expect(res.statusCode).toBe(200);
        expect(res_item).toEqual(item);
    });
    test("Returns 404 for item not found", async () => {
        const res = await request(app).get('/items/Peanuts');
        console.log(res.body);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toEqual("Resource not found")
    });
});

// POST an item, returns new item {item:item}
describe("POST /items", () => {
    test("Creates an item in fake db", async () => {
        const res = await request(app).post('/items').send({
            name: "Yogurt",
            price: 4.99
        });
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("Yogurt");
        expect(res.body.item.price).toEqual(4.99);
    });
});


// PATCH route, returns patched item {item:item}
describe("PATCH /items/:name", () => {
    test("Updates one item", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({
            name: "Pickle",
            price: 3.99
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("Pickle");
        expect(res.body.item.price).toEqual(3.99);
    });
    test("404 response for unfound item", async () => {
        const res = await request(app).patch(`/items/Penguin`).send({
            name: "Raspberries",
            price: 2.99
        });
        console.log(res.body);
        expect(res.statusCode).toBe(404);
    });
});

// DELETE route, deltes item and returns json w message
describe("DELETE /items/:name", () => {
    test("Deletes one item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({message:`Deleted item ${item.name}`})
    })
})



