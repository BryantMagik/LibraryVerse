"use client"

import * as React from 'react'
import useSWR from 'swr'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BookArtwork } from '../books/bookArtwork'
import { Book } from '@/app/types/typesModels'
import { lastBooks } from '@/actions/last-books'
import Link from 'next/link'
import { TitlePage } from '@/app/(protected)/_componets/title-page'

const BooksView: React.FC = () => {

    const { data: books, error } = useSWR('lastBooks', lastBooks, {})
    if (error) return <div>Error al cargar los libros: {error}</div>

    if (books && 'error' in books) {
        return <div>Error al obtener los libros: {books.error}</div>
    }

    if (!books) {
        return <div>Cargando libros...</div>
    }

    return (
        <>
            <TitlePage title={'Historias Actualizadas Recientemente'} subtitle={'Descubre las últimas actualizaciones...'}/>
            <Separator className="my-4" />
            <div className="relative">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.map((book: Book) => (
                            <Link key={book.id} href={`/book/${book.id}`}>
                                <BookArtwork key={book.id.toString()} className="w-[250px]" book={book} width={250} height={330} aspectRatio='portrait' />
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className='mt-6 space-y-1'>
                    <h2 className="text-2xl font-semibold text-custom-gray border-almond-300 border-b-4  dark:text-emerald-600 dark:border-emerald-400">
                        Más populares
                    </h2>
                    <p className='text-sm text-muted-foreground dark:text-white'>
                        Descubre las historias más populares...
                    </p>
                </div>
                <Separator className='my-4' />
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {books.map((book) => (
                            <Link key={book.id} href={`/dashboard/${book.id}`}>
                                <BookArtwork key={book.id.toString()} book={book} width={300} height={300} />
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>
            </div>
        </>
    )
}

export default BooksView
