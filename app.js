import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
// const { createRole } = require("./Controller/createRole.js")
import { createRole } from "./Controller/createRole.js";
import { createUser } from "./Controller/createUser.js";
import { login } from "./Controller/login.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("supabaseUrl :", supabaseUrl);
console.log("supabaseKey :", supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

app.post("/create-user", async (req, res) => {
  let returnData = await createUser(req);
  const response = {
    ...returnData,
  };
  res.status(response.statusCode).json(response.body);
});

app.post("/login", async (req, res) => {
  let returnData = await login(req);
  const response = {
    ...returnData, 
  };
  res.status(response.statusCode).json(response.body);
});

app.post("/role", async (req, res) => {
  let returnData = await createRole(req);
  const response = {
    ...returnData,
  };
  res.status(response.statusCode).json(response.body);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
