import { UsersService } from './users.service';
import type { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: User): User;
    findAll(): User[];
    findOne(id: string): User;
    update(id: string, body: Partial<User>): User;
    partialUpdate(id: string, body: Partial<User>): User;
    remove(id: string): void;
}
