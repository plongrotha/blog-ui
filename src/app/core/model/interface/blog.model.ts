export interface IBlog {
  blogId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogRequest {
  title: string;
  content: string;
}

export interface IBlogUpdate {
  title: string;
  content: string;
}
