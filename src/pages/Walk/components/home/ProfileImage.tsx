import React from 'react';
import { Image, View } from 'react-native-ui-lib';

// @TODO: 실제 profile image를 받아와 넣어 줘야 함.
export const ProfileImage: React.FC = () => (
  <View style={{ height: 200, marginBottom: 20 }}>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b' }}
      style={{ width: '100%', height: 200 }}
    />
  </View>
);
