"use client"
import * as React from 'react'
import { useState } from 'react'
import { GBook } from '@/app/types/typesBooksAPi'
import { Booklist } from '../_componets/searchBook/booklist'
import Search from '@/components/ui/search'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface LibroPageProps { }

const LibroPage: React.FC<LibroPageProps> = () => {
    const [books, setBooks] = useState<GBook[]>([])
    const [query, setQuery] = useState<string>('')
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false)

    const updateBooks = (newBooks: GBook[], newQuery: string) => {
        setBooks(newBooks ?? [])
        setQuery(newQuery ?? '')
        setSearchPerformed(true)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Search updateBooks={updateBooks} />
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.length !== 0 ? (
                            <Booklist title={`Resultados de ${query}`} books={books} />
                        ) : (
                            searchPerformed && (
                                <div className="pt-8 xl:mx-[10em] text-center">
                                    <p className="text-lg text-gray-500">No se encontraron libros para &quot;{query}&quot;.</p>
                                    <p className="text-sm text-gray-400">Intenta con una búsqueda diferente.</p>
                                </div>
                            )
                        )}

                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>
        </>
    )
}

export default LibroPage