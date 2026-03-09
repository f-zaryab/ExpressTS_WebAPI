import type { Request, Response, NextFunction } from "express";

const exitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    console.log("Response finished...");
    console.log("Status:", res.statusCode);
  });

  next();
};

export default exitMiddleware;
