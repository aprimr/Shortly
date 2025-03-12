import express from "express";
import { shortUrl } from "../controllers/url.controllers.js";

const router = express.Router();

router.post("/short-url", shortUrl);

export default router;
