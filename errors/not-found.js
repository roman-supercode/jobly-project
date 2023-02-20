import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

// Neue Klasse die von "CustomAPIError" erbt
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    // 404
  }
}

export default NotFoundError;
