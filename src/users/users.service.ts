import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user) {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(filter?: string, page: number = 1): User[] {
    let result = this.users;

    if (filter) {
      result = result.filter((user) =>
        user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
      );
    }

    const pageSize = 5;
    return result.slice((page - 1) * pageSize, page * pageSize);
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, data: Partial<User>) {
    const item = this.findOne(id);
    Object.assign(item, data);
    return item;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('usuário não encontrado');
    this.users.splice(index, 1);
  }
}
