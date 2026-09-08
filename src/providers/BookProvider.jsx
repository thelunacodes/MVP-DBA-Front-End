import { createContext, useContext, useState } from "react";

const BookContext = createContext(undefined);

export function BookProvider({children}) {
    const [ books, setBooks ] = useState([]);

    // let url = 'https://openlibrary.org/search/books.json?q=twain&limit=20&page=1'


    return (
        <BookContext.Provider value = {{ books: books, setBooks: setBooks }}>
            {children}
        </ BookContext.Provider>
    )
}

export function UseBookContext() {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("O 'UseBookContext' deve ser usado dentro de um 'BookProvider'!")
    }

    return context;
}