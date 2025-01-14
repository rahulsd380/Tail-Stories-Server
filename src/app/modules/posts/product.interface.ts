
export type TVote = {
  userId: string;
  votedAt: Date;
};

export type TComment = {
  _id?:string;
  authorId: string;
  commentedAt: Date;
  comment: string;
  likes: number;
};

export type TPost = {
  id: string;
  title: string;
  body: string;
  images?: string[];
  upvotes: TVote[];
  downvotes: TVote[];
  status?: 'draft' | 'published' | 'archived';
  contentType : "free" | "premium";
  comments: TComment[];
  category: string;
  createdAt: Date;
  authorId: string;
  totalShared:number;
};