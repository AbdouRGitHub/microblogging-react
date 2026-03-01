interface PageMetadata {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

interface PageResult<T> {
    content: T[];
    page: PageMetadata;
}

export type { PageMetadata, PageResult };