const express = require("express");
const app = express();
const port = 5000;

app.listen(port, (err) => {
  err
    ? console.log("server is failed")
    : console.log(`server is ranning in port ${port}`);
});
app.use(express.json());

const users = [
  { id: 1, name: "hamza", email: "hamza@gmail.com" },
  { id: 2, name: "karim", email: "karim@gmail.com" },
];

app.get("/api/users", async (req, res) => {
  res.status(200).json({ users: users });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const foundUser = users.find((elt) => elt.email === newUser.email);
  if (foundUser) {
    res.status(400).json({ message: "user already exist" });
  } else {
    const newUsers = [...users, newUser];
    res.status(200).json({ table: newUsers });
  }
});

app.delete("/api/users/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const tableAfterDelet = users.filter((elt) => elt.id != id);
  res.status(200).json({ msg: "user is deleted", table: tableAfterDelet });
});
