//

const request = require("supertest");

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test("should get list of mesures", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("should get list of mesures for maps", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1/mesuresForMaps")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("should get list of mesures en attente", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1/mesures/attente")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("should get list of mesures eteintes", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1/mesures/Eteinte")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
