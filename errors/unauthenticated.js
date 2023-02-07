import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

// Neue Klasse erbt von "CustomAPIError"
// wird verwendet, um einen Fehler auszulösen, wenn ein Benutzer keine Berechtigung hat, eine bestimmte Aktion auszuführen.
class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthenticatedError;