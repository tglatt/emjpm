//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();

  // The tests below will alter the user 52 password and reset_password_token
  // Before each tests we unsure that the user 52 is reset too.
  await knex("users")
    .where({ id: 52 })
    .update({
      password: "ad123",
      reset_password_token: "LpWpzK4Jla9I87Aq",
      reset_password_expires: knex.raw(`now() + interval '1 second'`),
      username: "ad"
    });
});

test("reset a password", async () => {
  const response = await request(server)
    .post("/api/v2/auth/reset-password-with-token")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      new_password: "test123456?",
      new_password_confirmation: "test123456?"
    });
  expect(response.body).toMatchSnapshot();
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("fail because the inputs don't match", async () => {
  const response = await request(server)
    .post("/api/v2/auth/reset-password-with-token")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      new_password: "test123456?",
      new_password_confirmation: "test123456"
    });
  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Object) },
    `
    Object {
      "errors": Any<Object>,
    }
  `
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(400);
});

test("fail because nekot is not a valid token", async () => {
  const response = await request(server)
    .post("/api/v2/auth/reset-password-with-token")
    .send({
      token: "nekot",
      new_password: "test123456?",
      new_password_confirmation: "test123456?"
    });
  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Object) },
    `
    Object {
      "errors": Any<Object>,
    }
  `
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(419);
});

test("fail because the token has expired", async () => {
  await knex("users")
    .where({ id: 52 })
    .update({
      reset_password_expires: knex.raw(`now() - interval '1 second'`)
    });

  const response = await request(server)
    .post("/api/v2/auth/reset-password-with-token")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      new_password: "test123456?",
      new_password_confirmation: "test123456?"
    });
  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Object) },
    `
    Object {
      "errors": Any<Object>,
    }
  `
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(419);
});

test("should empty user token+expiration on password reset", async () => {
  await knex("users")
    .where({ id: 52 })
    .update({
      reset_password_expires: knex.raw(`now() + interval '1 second'`),
      reset_password_token: "abcdef"
    });

  const response = await request(server)
    .post("/api/v2/auth/reset-password-with-token")
    .send({
      token: "abcdef",
      new_password: "test123456?",
      new_password_confirmation: "test123456?"
    });

  const userData = await knex("users")
    .where({ id: 52 })
    .first();

  expect(userData.reset_password_expires).toBeNull();
  expect(userData.reset_password_token).toBeNull();
  expect(response.body).toMatchSnapshot();
  expect(nodemailerMock.mock.sentMail().length).toEqual(1);
  expect(response.status).toBe(200);
});

//
