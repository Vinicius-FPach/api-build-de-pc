"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [];
    create(user) {
        const newUser = {
            id: this.users.length + 1,
            ...user,
        };
        this.users.push(newUser);
        return newUser;
    }
    findAll(filter, page = 1) {
        let result = this.users;
        if (filter) {
            result = result.filter((user) => user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
        }
        const pageSize = 5;
        return result.slice((page - 1) * pageSize, page * pageSize);
    }
    findOne(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return user;
    }
    update(id, data) {
        const item = this.findOne(id);
        Object.assign(item, data);
        return item;
    }
    remove(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1)
            throw new common_1.NotFoundException('usuário não encontrado');
        this.users.splice(index, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map