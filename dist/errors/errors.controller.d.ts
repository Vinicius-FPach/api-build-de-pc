export declare class ErrorsController {
    getCustomError(): void;
    getBadRequest(): void;
    getNotFound(): void;
    getUnauthorized(): void;
    getForbidden(): void;
    findOne(id: string): {
        id: string;
        message: string;
    };
}
