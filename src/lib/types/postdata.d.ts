interface CommentData {
  id: string;
  username: string;
  content: string;
}

interface PostData {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  comments: CommentData[];
  tags: string[];
}
