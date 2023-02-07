// Klasse zur Erweiterung der Build-in Error-Klasse, um eine benutzerdefinierte Nachricht
// für einen Fehler zu spezifizieren
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

export default CustomAPIError;