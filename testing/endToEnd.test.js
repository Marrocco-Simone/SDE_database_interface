require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const { faker } = require("@faker-js/faker");
const { User, Content } = require("../src/schemas");
mongoose.set("strictQuery", true);
const { connect, disconnect, Types } = mongoose;

const port = 3000;
const url = `http://localhost:${port}/db`;
const mongoDbUrl = process.env.MONGODBURL;

/**
 * @type {{
 * email: String,
 * password: String,
 * _id: Types.ObjectId
 * }}
 */
let testUser;

const getnewUser = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

const getnewContent = () => {
  return {
    content_text: faker.lorem.paragraph(),
    title: faker.animal.cat(),
  };
};

beforeAll(async () => {
  await connect(mongoDbUrl);
  testUser = new User(getnewUser());
  await testUser.save();
});

afterAll(async () => {
  await Content.deleteMany({ user: testUser._id });
  await testUser.delete();
  await disconnect();
});

test("server is up", async () => {
  const res = await fetch(`${url}`);
  const res_json = await res.json();
  expect(res_json.success).toBe(true);
});

test("API working", async () => {
  // * LOGIN
  const res_login = await fetch(`${url}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });
  const res_login_json = await res_login.json();

  expect(res_login.status).toBe(200);
  expect(res_login_json.email).toEqual(testUser.email);

  const token = res_login_json.token;

  // * VERIFY TOKEN
  const res_verify = await fetch(`${url}/login`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const res_verify_json = await res_verify.json();

  expect(res_verify.status).toBe(200);
  expect(res_verify_json._id).toEqual(testUser.id.toString());
  expect(res_verify_json.email).toEqual(testUser.email);

  // * INSERT CONTENT
  const content1 = getnewContent();
  const res_generate1 = await fetch(`${url}/generate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(content1),
  });
  const res_generate_json1 = await res_generate1.json();

  expect(res_generate1.status).toBe(200);
  expect(res_generate_json1.user).toEqual(testUser._id.toString());
  expect(res_generate_json1.title).toEqual(content1.title);
  expect(res_generate_json1.content_text).toEqual(content1.content_text);

  const content2 = getnewContent();
  const res_generate2 = await fetch(`${url}/generate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(content2),
  });
  const res_generate_json2 = await res_generate2.json();

  expect(res_generate2.status).toBe(200);
  expect(res_generate_json2.user).toEqual(testUser._id.toString());
  expect(res_generate_json2.title).toEqual(content2.title);
  expect(res_generate_json2.content_text).toEqual(content2.content_text);

  // * GET CONTENT
  const res_get = await fetch(`${url}/get`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const res_get_json = await res_get.json();

  expect(res_get.status).toBe(200);
  expect(res_get_json.length).toBe(2);
});
