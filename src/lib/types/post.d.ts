interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    comments: string[];
    tags: string[];
}