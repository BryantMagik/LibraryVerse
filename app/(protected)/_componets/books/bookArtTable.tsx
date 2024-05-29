import { Book } from "@/app/types/typesModels"
import { es } from 'date-fns/locale'
import Link from "next/link"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { statusLabels } from "@/app/types/typesModels"
import { Button, Image } from "@nextui-org/react"
import { MdOutlineDelete } from "react-icons/md"

interface BookArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    book: Partial<Book>
    wdth?: number
    hght?: number
    removeBook: (bookId: string) => void
    editBook: (bookId: string) => void
}

export const BookArtTable: React.FC<BookArtTableProps> = ({
    book,
    wdth = 80,
    hght = 125,
    removeBook,
    editBook,
}) => {

    const imageUrl = book.coverImage || '/dashboard/book-placeholder.jpg'
    const altText = book.title || 'Sin titulo'
    const updatedAt = book.updatedAt ? new Date(book.updatedAt) : null

    let formattedDate
    if (updatedAt) {
        formattedDate = formatDistanceToNow(updatedAt, { addSuffix: true, locale: es })
    } else {
        formattedDate = 'Fecha de actualización no disponible'
    }

    return (
        <div className="flex flex-row md:pt-2 pt-2">
            <div className="">
                <Image
                    src={imageUrl}
                    alt={altText}
                    width={wdth}
                    height={hght}
                />
            </div>
            <div className="flex-1 ml-5">
                <Link key={book.id} href={`/historias/${book.id}`}>
                    <h3 className="font-medium leading-none text-black dark:text-emerald-400 hover:underline p-2">{book.title}</h3>
                </Link>
                {book.status && (
                    <h3 className="font-medium leading-none text-library-500 dark:text-emerald-400 p-2">{statusLabels[book.status]}</h3>
                )}
                <p className="text-xs text-muted-foreground p-2">Actualizada {formattedDate}</p>
            </div>
            <div className="flex flex-col place-content-center">
                <Button
                    onClick={() => book.id && removeBook(book.id)}
                    disabled={!book.id}
                    className="hover:bg-almond-500 dark:hover:bg-almond-600 hover:text-white p-2 mb-2 mx-auto rounded-full bg-almond-300 text-white dark:bg-almond-400"
                >
                    Editar Libro
                </Button>
                <Button
                    onClick={() => book.id && removeBook(book.id)}
                    disabled={!book.id}
                    className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white p-2 mb-2 pt-2 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-500"
                >
                    <MdOutlineDelete size={25} />
                </Button>
            </div>
        </div>
    )
}

