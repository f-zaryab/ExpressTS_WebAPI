import type { Request, Response } from "express";
import { pets } from "../data/pets.ts";
import type { Pet } from "../data/pets.ts";

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

const getPets = (
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
};

const getPetById = (
  req: Request<{ id: string }>,
  res: Response<{ data: Pet } | { message: string }>,
): void => {
  console.log("In Controller now...");

  const { id } = req.params;
  const pet = pets.find((pet) => pet.id === Number(id));

  if (pet) {
    res.json({ data: pet });
  } else {
    res.status(404).json({ message: "No pet with that ID" });
  }
};

export { getPets, getPetById };
