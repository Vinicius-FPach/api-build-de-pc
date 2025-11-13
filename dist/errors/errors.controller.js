"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsController = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("./custom-exception/custom-exception");
let ErrorsController = class ErrorsController {
    getCustomError() {
        throw new custom_exception_1.CustomException();
    }
    getBadRequest() {
        throw new common_1.BadRequestException('O parâmetro enviado é inválido');
    }
    getNotFound() {
        throw new common_1.NotFoundException('O recurso solicitado não foi encontrado');
    }
    getUnauthorized() {
        throw new common_1.UnauthorizedException('Usuário não autenticado');
    }
    getForbidden() {
        throw new common_1.ForbiddenException('Acesso negado');
    }
    findOne(id) {
        if (isNaN(Number(id))) {
            throw new common_1.BadRequestException('O ID deve ser um número válido');
        }
        if (id === '0') {
            throw new common_1.UnauthorizedException('Usuário não autenticado');
        }
        if (id === '2') {
            throw new common_1.ForbiddenException('Você não tem permissão para acessar este recurso');
        }
        if (id !== '1') {
            throw new common_1.NotFoundException('Recurso não encontrado');
        }
        return { id, message: 'Recurso encontrado' };
    }
};
exports.ErrorsController = ErrorsController;
__decorate([
    (0, common_1.Get)('custom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "getCustomError", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "getBadRequest", null);
__decorate([
    (0, common_1.Get)('not-found'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "getNotFound", null);
__decorate([
    (0, common_1.Get)('unauthorized'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "getUnauthorized", null);
__decorate([
    (0, common_1.Get)('forbidden'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "getForbidden", null);
__decorate([
    (0, common_1.Get)('test/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "findOne", null);
exports.ErrorsController = ErrorsController = __decorate([
    (0, common_1.Controller)('errors')
], ErrorsController);
//# sourceMappingURL=errors.controller.js.map