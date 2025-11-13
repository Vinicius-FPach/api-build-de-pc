import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(CreateUserDto: CreateUserDto): User;
    findAll(): {
        id: number;
        name: string;
    }[];
    findOneUser(id: number): {
        id: number;
        name: string;
    };
    update(id: number, body: Partial<User>): User;
    partialUpdate(id: number, body: Partial<User>): User;
    remove(id: number): void;
}
