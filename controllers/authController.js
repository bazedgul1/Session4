import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

const usersFile = "./data/users.json";

const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username and password are required");

  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  const userExists = users.find((user) => user.username === username);

  if (userExists) return res.status(400).send("User already exists");

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ id: Date.now(), username, password: hashedPassword });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(201).send("User registered successfully");
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username and password are required");

  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  const user = users.find((user) => user.username === username);

  if (!user) return res.status(404).send("User not found");

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user.id, username: user.username }, "secretKey", {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

export { register, login };
