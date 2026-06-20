export class UpstreamError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = "UpstreamError";
        this.status = 502;
        this.cause = cause;
    }
}