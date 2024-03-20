export interface Post {
    id: number;
    userName: string;
    createdDate: Date;
    profilImage: string;
    image: string;
    text: string;
    likeCount: number;
    isLiked: boolean;
}