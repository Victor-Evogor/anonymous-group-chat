export interface Message{
    id: string,
    timestamp: string, // from new Date() e.g Wed Oct 25 2023 07:42:28 GMT+0100 (West Africa Standard Time)
    message?: string,
    authorId: string,
    authorName?: string,
    authorAvatar?: string,
    image?: string,
    attachment?: string,
    audio?: string,
    color?: string
}
