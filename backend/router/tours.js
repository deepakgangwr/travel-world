import express from "express";
import { 
  createTour, 
  deleteTour, 
  getAllTour, 
  getFeaturedTour, 
  getSingleTour, 
  getTourCount, 
  updateTour 
} from "../controllers/tourController.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const tourRoute = express.Router();

tourRoute.post("/", createTour); // Create a tour
tourRoute.put("/:id", updateTour); // Update a tour
tourRoute.delete("/:id", deleteTour); // Delete a tour
tourRoute.get("/featured", getFeaturedTour); // Get featured tours
tourRoute.get("/count", getTourCount); // Get tour count

// Correctly define the get routes
tourRoute.get("/:id", getSingleTour); // Get a single tour by ID
tourRoute.get("/", getAllTour); // Get all tours

export default tourRoute;
