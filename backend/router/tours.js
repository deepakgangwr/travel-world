import express from "express";
import { 
  createTour, 
  deleteTour, 
  getAllTour, 
  getFeaturedTour, 
  getSingleTour, 
  getTourCount, 
  getTourBySearch,
  updateTour 
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const tourRoute = express.Router();

tourRoute.post("/",verifyAdmin, createTour); // Create a tour
tourRoute.put("/:id", verifyAdmin,updateTour); // Update a tour
tourRoute.delete("/:id",verifyAdmin, deleteTour); // Delete a tour
tourRoute.get("/:id", getSingleTour); // Get a single tour by ID
tourRoute.get("/", getAllTour); // Get all tours

// Fix: Moved this under /search to match request
tourRoute.get("/search/getFeaturedTours", getFeaturedTour); // Get featured tours
tourRoute.get("/search/getTourBySearch", getTourBySearch); // Get tours by search
tourRoute.get("/search/getTourCount",getTourCount); // Get tour count


export default tourRoute;
