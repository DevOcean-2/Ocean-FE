export interface FeedCreateRequest {
  image_urls: string[];
  content: string;
}

export interface FeedCreateResponse {}

export interface FeedLikeByType {
  user_id: string;
  nickname: string;
  profile_image_url: string;
}

export interface FeedPostsResponse {
  post_id: number;
  image_urls: string[];
  content: string;
  uploaded_at: string;
  liked_by: FeedLikeByType[];
}

export interface FeedToggleLikeRequest {
  post_id: number;
}

export interface FeedDeleteRequest {
  post_id: number;
}

export interface UserInfoResponse {
  user_name: string;
  dog_name: string;
  dog_gender: string;
  dog_size: string;
  dog_cuteness: number;
  dog_breed: string;
  photo_path: string;
  birth_day: string;
  current_weight: number;
  past_weight: number;
  weight_change: number;
  age: string;
}
