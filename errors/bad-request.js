import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

// Neue Klasse die von "CustomAPIError" erbt
// Verwendung zur Fehlerausgabe, wenn eine Anfrage an den Server fehler hast ist.
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
