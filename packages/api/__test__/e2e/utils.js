//

const request = require("supertest");
const server = require("@emjpm/api/app");

//

exports.userTypes = {
  mandataire: {
    username: "jeremy",
    password: "johnson123"
  },
  service: {
    username: "service1",
    password: "service1"
  },
  ti: {
    username: "ti1",
    password: "ti1"
  },
  admin: {
    username: "admin",
    password: "admin"
  }
};

exports.logMeIn = async (userType = exports.userTypes.mandataire) => {
  return request(server)
    .post("/auth/login")
    .send(userType);
};

exports.getTokenByUserType = async userType => {
  const login = await exports.logMeIn(exports.userTypes[userType]);
  return login.body.token;
};
