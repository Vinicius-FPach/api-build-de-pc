import { User } from './interfaces/user.interface';
export declare class UsersService {
    private items;
    create(item: User): User;
    findAll(): User[];
    findOne(id: string): User;
    update(id: string, data: Partial<User>): User;
    remove(id: string): void;
}
