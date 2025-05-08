import { db } from '../index.ts';

export const getBooks = async() => {
    const bookDetails = await db.books.findMany();
    return bookDetails;
}

export const getBooksById = async(id: number) => {
    const bookDetailsById = await db.books.findUnique({
        where: {
            BookId: id,
        }
    })
    return bookDetailsById;
}
