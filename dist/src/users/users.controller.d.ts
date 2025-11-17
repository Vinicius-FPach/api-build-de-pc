import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(data: any): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    } | null>;
    update(id: string, data: any): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }>;
}
