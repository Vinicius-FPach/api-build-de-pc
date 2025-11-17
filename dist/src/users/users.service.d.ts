import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<{
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
    findOne(id: number): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    } | null>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        age: number | null;
        createdAt: Date;
        id: number;
    }>;
}
