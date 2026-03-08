import express from "express";
import type { Express } from "express";

const app: Express = express();

const PORT = process.env.PORT || 5001;

type Pet = {
  name: string;
  species: string;
  adopted: boolean;
  age: number;
};

const pet: Pet = {
  name: "Rubik",
  species: "Cat",
  adopted: true,
  age: 3,
};

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to PET-Api" });
});

app.get("/pet", (req, res) => {
  res.json({ data: pet });
});

app.listen(PORT, (): void => {
  console.log(`App is listening on PORT: ${PORT}`);
});
