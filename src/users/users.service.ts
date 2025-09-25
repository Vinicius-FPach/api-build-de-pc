import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private items: User[] = [];

  create(item: User) {
    this.items.push(item);
    return item;
  }

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const item = this.items.find((item) => item.id === id);
    if (!item) throw new NotFoundException('Usuário não encontrado');
    return item;
  }

  update(id: string, data: Partial<User>) {
    const item = this.findOne(id);
    Object.assign(item, data);
    return item;
  }

  remove(id: string) {
    const index = this.items.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('usuário não encontrado');
    this.items.splice(index, 1);
  }
}
