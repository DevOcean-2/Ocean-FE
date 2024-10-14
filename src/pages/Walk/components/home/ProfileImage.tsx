import React from 'react';
import { Image, View } from 'react-native-ui-lib';

export const ProfileImage: React.FC = () => (
  <View style={{ height: 200, marginBottom: 20 }}>
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b' }}
      style={{ width: '100%', height: 200 }}
    />
  </View>
);
