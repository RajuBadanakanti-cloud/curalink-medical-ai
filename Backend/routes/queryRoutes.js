import express from "express"
import { handleQuery } from "../controllers/queryController.js"

const routes = express.Router()

routes.route("/query").post(handleQuery)

export default routes