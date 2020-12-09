require('dotenv').config();
const fs = require('fs');
const request = require("supertest");
const app = require("../app");
const pool = require('../utils/pool.js');
const Bots = require('../models/bots')



describe("app routes", () => {

  let bots;
  beforeEach( async () => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    bots = await Bots
    .insert({
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly"
      })
  });

  afterAll(() => {
    return pool.end();
  });



  test.skip("POST bots", async () => {
    const post = {
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly"
    };
    const expectation = {
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly",
        id: "2"
   
    };
    const data = await request(app)
      .post("/bots")
      .send(post)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test.skip("GET all bots", async () => {
    const expectation = [
      {
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly",
        id: "1"
      }
    ];

    const data = await request(app)
      .get("/bots")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test.skip("GET bots by id", async () => {
    const expectation = {
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly",
        id: "1"
     
    };

    const data = await request(app)
      .get("/bots/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test.skip("PUT bots", async () => {
    const update = {
      id: bots.id,
      name: "Langston",
      sign: "Libra",
      sweet: "Can be",
      sassy: "Mainly"
    };

    const expectation = {
      id: "1",
      name: "Langston",
      sign: "Libra",
      sweet: "Can be",
      sassy: "Mainly"
    };

    const id = 1;

    const data = await request(app)
      .put(`/bots/${bots.id}`)
      .send(update)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test.only("DELETE bots", async () => {
    const id = 10
    const expectation = 
      {
        name: "Langston",
        sign: "Libra",
        sweet: "Can be",
        sassy: "Mainly",
        id: "1"
      };
  
    const data = await request(app)
      .delete(`/bots/1`)
      .expect("Content-Type", /json/)
      .expect(200);

    const bots = await request(app)
      .get("/bots")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});