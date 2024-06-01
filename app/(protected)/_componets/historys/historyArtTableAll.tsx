import { Chapter } from "@/app/types/typesModels"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/react"
import { SlOptions } from "react-icons/sl"
import { FaRegEdit } from "react-icons/fa"

interface HistoryArtTableProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter: Partial<Chapter>
    readChapter?: (chapterId: string) => void
}

export const HistoryArtTableAll: React.FC<HistoryArtTableProps> = ({
    chapter,
    readChapter,
}) => {

    return (
        <div className="flex flex-row md:pt-2 pt-2">
            <div className="content-center">
            </div>
            <div className="ml-5 content-center">
                <h3 className="font-medium leading-none text-black dark:text-emerald-400 hover:underline p-2">
                    Capitulo {chapter.order}:
                </h3>
            </div>
            <h3 className="flex-1 content-center font-medium leading-none italic text-black dark:text-emerald-400 hover:underline p-2">
                {chapter.title}
            </h3>
            <div className="flex flex-col place-content-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button aria-label="Options" className="hover:bg-library-600 dark:hover:bg-emerald-600 hover:text-white p-2 mb-2 mx-auto rounded-full bg-library-300 text-white dark:bg-emerald-400">
                            <SlOptions size={25} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Chapter actions">
                        <DropdownSection>
                            <DropdownItem textValue="Edit Chapter" onClick={() => chapter.id && readChapter && readChapter(chapter.id)}>
                                <span className="flex flex-row">
                                    <FaRegEdit size={18} />
                                    <span className="ml-1">Ver capitulo</span>
                                </span>
                            </DropdownItem>
                        </DropdownSection>

                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}