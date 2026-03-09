import type { Request, Response, NextFunction } from "express";

const validateNumericId = (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>,
  next: NextFunction,
) => {
  console.log("Middleware: ValidateNumericId...");

  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: "Pet ID must be a number" });
  } else {
    next();
  }
};

type PasswordQueryParams = {
  password: string;
};

const pleaseAuth = (
  req: Request<{}, unknown, {}, PasswordQueryParams>,
  res: Response<{ message: string }>,
  next: NextFunction,
) => {
  console.log("Middleware: PleaseAuth...");

  const { password } = req.query;

  if (!password || password !== "please") {
    res.status(401).json({ message: "Wrong Password" });
  } else {
    next();
  }
};

export { validateNumericId, pleaseAuth };
