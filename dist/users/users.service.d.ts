import { User } from './interfaces/user.interface';
export declare class UsersService {
    private users;
    create(user: any): User;
    findAll(filter?: string, page?: number): User[];
    findOne(id: number): User;
    update(id: number, data: Partial<User>): User;
    remove(id: number): void;
}
