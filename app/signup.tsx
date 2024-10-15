import SignUp from '@/src/pages/SignUp';
import React from 'react';
import { ScrollView } from 'react-native';

export default function SignUpScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SignUp />
    </ScrollView>
  );
}
