

import { cn } from '@/lib/utils'
import { buttonVariants } from '../../ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '../../ui/pagination'

const pages = [1, 2, 3]

const BorderedPaginationDemo = () => {
    return (
        <Pagination>
            <PaginationContent className='gap-0 divide-x overflow-hidden rounded-lg border'>
                <PaginationItem>
                    <PaginationPrevious href='#' className='rounded-none' />
                </PaginationItem>
                {pages.map(page => {
                    const isActive = page === 2

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`#${page}`}
                                className={cn(
                                    {
                                        [buttonVariants({
                                            variant: 'default',
                                            className:
                                                'hover:!text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:text-primary-foreground dark:hover:bg-primary/90 dark:border-transparent'
                                        })]: isActive
                                    },
                                    'rounded-none border-none'
                                )}
                                isActive={isActive}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
                <PaginationItem>
                    <PaginationNext href='#' className='rounded-none' />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default BorderedPaginationDemo
