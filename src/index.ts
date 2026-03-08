import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.ts";

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Handling CORS
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to PET-Api" });
});

app.get("/pet", (req: Request, res: Response): void => {
  res.json({ data: pets });
});

// Not-Found Route
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "No route found" });
});

// Server
app.listen(PORT, (): void => {
  console.log(`App is listening on PORT: ${PORT}`);
});
