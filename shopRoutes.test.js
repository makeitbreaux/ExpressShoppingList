process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDB");

let keyboard = {name: "keyboard", price: 200}

beforeEach(async () => {
    items.push(keyboard);
  });
  
afterEach(async () => {
    items = []
  }); 

describe("GET /items", function() {
    test("Get all items", async function() {
        const res = await request(app).get(`/items`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [keyboard]}) 
    })
});

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
      const resp = await request(app).get(`/items/${keyboard.name}`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual({item: keyboard});
    });
  
    test("Responds with 404 if can't find item", async function() {
      const resp = await request(app).get(`/items/0`);
      expect(resp.statusCode).toBe(404);
    });
  });

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const resp = await request(app).post(`/items`).send({name: "Phone", price:500});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({item: { name: "Phone", price:500 }});
      })
    test("Respond with 400 if name is missing", async function() {
        const resp = await request(app).post("/items").send({});
        expect(resp.statusCode).toBe(400);
      })
    });

describe("PATCH /items/:name", function () {
    test("Updating an item's name", async () => {
          const res = await request(app).patch(`/items/${keyboard.name}`).send({name:"PS5"});
           expect(res.statusCode).toBe(200);
           expect(res.body).toEqual({item: {name:"PS5"}})
          })
        })
        
    test("Responds with 404 if can't find item", async () => {
          const res = await request(app).patch(`/items/0`);
          expect(res.statusCode).toBe(404);
        });

describe("DELETE /items/:name", function() {
    test("Deletes an item", async function() {
        const res = await request(app).delete(`/items/${keyboard.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message : "Deleted"})
    })

})