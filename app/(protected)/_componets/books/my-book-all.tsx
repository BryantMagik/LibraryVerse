"use client"

import * as React from 'react'
import { useEffect, useState, useTransition } from 'react'
import { Book } from '@/app/types/typesModels'
import { Separator } from '@/components/ui/separator'
import { myBooksAll } from '@/actions/my-books-all'
import { BookArtTable } from './bookArtTable'
import { TitlePage } from '@/app/(protected)/_componets/title-page'
import { deleteBook } from '@/actions/delete-book'
import { publishBook } from '@/actions/publish-book'
import { unpublishBook } from '@/actions/unpublish-book'
import { BookFormUpdate } from '../create/book-update-form'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal"
import { useDisclosure } from '@nextui-org/react'

const MyBooksAll: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useEffect(() => {
        myBooksAll()
            .then((mybooks) => {
                if ('error' in mybooks) {
                    console.error('Error al obtener los últimos libros:', mybooks.error);
                } else {

                    setBooks(mybooks)
                }
            })
    }, [])

    const removeBookHandler = async (bookId: string) => {
        deleteBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(books.filter((book) => book.id !== bookId))
                }
            })
    }

    const editBookHandler = (bookId: string) => {
        console.log('editado', bookId)

    }

    const publicBookHandler = (bookId: string) => {
        publishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(books.map((book) => {
                        if (book.id === bookId) {
                            return { ...book, status: 'PUBLISHED' }
                        }
                        return book
                    }))
                }
            })
    }

    const cancelPublicBookHandler = (bookId: string) => {
        unpublishBook(bookId)
            .then((data) => {
                if (data?.success) {
                    setBooks(books.map((book) => {
                        if (book.id === bookId) {
                            return { ...book, status: 'DRAFT' }
                        }
                        return book
                    }))
                }
            })
    }

    return (
        <>
            <TitlePage title="Todas mis historias" subtitle={'Continúa escribiendo y publicando tus historias...'} />
            <Separator className="my-4" />
            <div className="relative">
                <div className="flex flex-col">
                    {books.map((book: Book) => (
                        <BookArtTable key={book.id.toString()} className="w-[250px]" book={book} removeBook={removeBookHandler} editBook={onOpen} publicBook={publicBookHandler} cancelPublication={cancelPublicBookHandler} />
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onclose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Editar Historia</ModalHeader>
                            <ModalBody>
                                {books.map((book: Book) => (
                                    <BookFormUpdate book={book} />
                                ))}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default MyBooksAll
