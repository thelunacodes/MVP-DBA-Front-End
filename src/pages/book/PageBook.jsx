import { useEffect } from "react"
import Header from "../../components/Header/Header.jsx"
import "./PageBook.jsx"

export default function PageBook({book=null}) {
    
    useEffect(() => {
        if (book === null) {
            //buscar livro pelo bookKey no parâmetro
        }
    }, [])
    
    return (
        <div className="flex column mainPageContainer">
            <title>Book Reviews - [Book Name]</title>
            <Header />
            <div className="flex column vCenter vScroll pageContentContainer">

            </div>  
        </div>
    )
}