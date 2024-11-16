export interface FeedCreateRequest {
  image_urls: string[];
  content: string;
}

export interface FeedCreateResponse {

}

export interface FeedPostsResponse {
  post_id: number;
  image_urls: string[];
  uploaded_at: string;
  liked_by: string[];
  content: string;
}
