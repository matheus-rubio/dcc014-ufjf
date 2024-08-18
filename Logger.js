class Logger {
    constructor() {}

    info(message) {
        console.log(`\u{1F535} INFO: ${message}`);
    }

    error(message) {
        console.log(`\u{1F534} ERROR: ${message}`);
    }

    warn(message) {
        console.log(`\u{1F7E1} WARNING: ${message}`);
    }

    success(message) {
        console.log(`\u{2705} SUCCESS: ${message}`);
    }
}

module.exports = new Logger();