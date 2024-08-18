class Logger {
    constructor() {}

    info(message: string) {
        console.log(`\u{1F535} INFO: ${message}`);
    }

    error(message: string) {
        console.log(`\u{1F534} ERROR: ${message}`);
    }

    warn(message: string) {
        console.log(`\u{1F7E1} WARNING: ${message}`);
    }

    success(message: string) {
        console.log(`\u{2705} SUCCESS: ${message}`);
    }
}

export default new Logger();