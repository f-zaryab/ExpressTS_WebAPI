import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.ts";
import type { Pet } from "./data/pets.ts";

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Handling CORS
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to PET-Api" });
});

// PETS -------------------------------------------------------------------------//
type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

app.get(
  "/pets",
  (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<{ data: Pet[] } | { message: string }>,
  ): void => {
    const { species, adopted, minAge, maxAge } = req.query;

    let filteredPets: Pet[] = pets;

    if (species) {
      filteredPets = filteredPets.filter(
        (pet) => pet.species.toLowerCase() === species.toLowerCase(),
      );
    }

    if (adopted !== undefined) {
      const isAdopted = adopted === "true";

      filteredPets = filteredPets.filter((pet) => pet.adopted === isAdopted);
    }

    const min = Number(minAge);
    const max = Number(maxAge);

    if (
      (minAge !== undefined && Number.isNaN(min)) ||
      (maxAge !== undefined && Number.isNaN(max))
    ) {
      res.status(400).json({ message: "Age filters must be valid numbers" });
      return;
    }

    if (minAge !== undefined) {
      filteredPets = filteredPets.filter((pet) => pet.age >= min);
    }

    if (maxAge !== undefined) {
      filteredPets = filteredPets.filter((pet) => pet.age <= max);
    }

    res.json({ data: filteredPets });
  },
);

app.get(
  "/pets/:id",
  (
    req: Request<{ id: string }>,
    res: Response<{ data: Pet } | { message: string }>,
  ): void => {
    const { id } = req.params;
    const pet = pets.find((pet) => pet.id === Number(id));

    if (pet) {
      res.json({ data: pet });
    } else {
      res.status(404).json({ message: "No pet with that ID" });
    }
  },
);

// Not-Found Route --------------------------------------------------------------//
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "No route found" });
});

// Server
app.listen(PORT, (): void => {
  console.log(`App is listening on PORT: ${PORT}`);
});
