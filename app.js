import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("supabaseUrl :", supabaseUrl);
console.log("supabaseKey :", supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password, firstname, lastname, role_id } = req.body;
  const user_id = uuidv4().slice(0, 8);

  const { data, error } = await supabase.from("users").insert([
    {
      user_id,
      username,
      password,
      firstname,
      lastname,
      role_id,
      create_user: user_id,
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data)
    return res.status(401).json({ error: "Invalid credentials" });
  res.json({ message: "Login successful", user: data });
});

app.post("/role", async (req, res) => {
  const { role_name, user_id } = req.body;
  const role_id = uuidv4().slice(0, 8);

  const { data, error } = await supabase.from("role").insert([
    {
      role_id,
      role_name,
      create_user: user_id,
      update_user: user_id, // เอา user_id มาใส่ update_user ด้วย
    },
  ]);
  console.log({
    role_id,
    role_name,
    create_user: user_id,
    update_user: user_id, // เอา user_id มาใส่ update_user ด้วย
  });
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
