import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import type { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(CreateUserDto: CreateUserDto): User;
    findAllUsers(queryFilter: QueryFilterDto): User[];
    findOneUser(id: number): User;
    update(id: number, body: Partial<User>): User;
    partialUpdate(id: number, body: Partial<User>): User;
    remove(id: number): void;
}
