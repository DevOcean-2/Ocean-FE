import { createContext } from 'react';
import { Asset } from 'expo-media-library';

interface FeedUploadContextContextType {
  selectedImage?: Asset[];
}

export const FeedUploadContext = createContext<FeedUploadContextContextType>({});
