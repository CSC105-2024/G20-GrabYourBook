import { db } from '../index.ts'

export const isDuplicate = async (username: string, password: string) => {
    const user = await db.users.findFirst({
        where: {
            Username: username,
            Password: password
        },
    });
    return user;
}

export const createUser = async (username: string, password: string) => {
    const user = await db.users.create({
        data: {
            Username: username,
            Password: password,
        },
    });
    return user;
}

export const getUserById = async (id: number) => {
    const user = await db.users.findUnique({
        where: {
            UserId: id
        },
    });
    return user;
}