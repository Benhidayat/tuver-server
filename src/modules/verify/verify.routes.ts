import { Router } from "express";

import * as verifyController from "./verify.controller.js";

const verifyRouter = Router();

verifyRouter.post('/verify', verifyController.verifyUrl);

export default verifyRouter;