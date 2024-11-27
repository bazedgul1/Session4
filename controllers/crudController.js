import fs  from "fs";

const dataFile = "./data/users.json";

const getData = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  res.status(200).json(data);
};

const addData = (req, res) => {
  const { username, password } = req.body;

  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  const newData = { id: Date.now(), username, password };
  data.push(newData);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.status(201).json(newData);
};

const updateData = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  const user = data.find((user) => user.id == id);
  if (!user) return res.status(404).send("User not found");

  user.username = username;
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.status(200).json(user);
};

const deleteData = (req, res) => {
  const { id } = req.params;

  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  const updatedData = data.filter((user) => user.id != id);
  fs.writeFileSync(dataFile, JSON.stringify(updatedData, null, 2));

  res.status(200).send("User deleted");
};

export { getData, addData, updateData, deleteData };
