const request = require("supertest");
const express = require("express");
const server = require("../server.js");

let serverInstance;

beforeEach(function (done) {
  serverInstance = server.run(done);
});

afterEach(function (done) {
  serverInstance.close(done);
});

describe("POST /countdown", () => {
  it("should calculate the seconds until the event", function (done) {
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000); // 5 Minuten in der Zukunft

    request(serverInstance)
      .post("/countdown")
      .send({ dateTime: fiveMinutesFromNow.toISOString() })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.seconds).toBeCloseTo(5 * 60, -1);
        done();
      }).catch((err) => {
        console.error(err);
        done(err);
      });
  });
});

describe("GET /", () => {
  it("hello", function (done) {
    request(serverInstance).get("/").then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});


