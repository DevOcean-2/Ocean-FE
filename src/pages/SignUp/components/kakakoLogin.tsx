import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ICON_PATH } from '@/assets/svgs';

interface KakaoLoginScreenProps {
  goToNextStep: () => void;
}

const KakaoLoginScreen: React.FC<KakaoLoginScreenProps> = ({ goToNextStep }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>LOGO TYPE</Text>
        </View>

        <Text style={styles.existingMemberText}>회원가입이 필요하신가요?</Text>

        <TouchableOpacity style={styles.kakaoButton} onPress={goToNextStep}>
          <ICON_PATH />
          <Text style={styles.kakaoButtonText}>카카오톡으로 시작하기</Text>
        </TouchableOpacity>

        <View style={styles.existingMemberContainer}>
          <Text style={styles.existingMemberText}>기존 회원이라면</Text>
          <TouchableOpacity style={styles.loginButton} onPress={goToNextStep}>
            <Text style={styles.loginButtonText}>카카오톡으로 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 240,
    height: 240,
    marginBottom: 80,
    borderRadius: 24,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8F9BB3',
    marginBottom: 16,
  },
  kakaoButton: {
    width: '100%',
    backgroundColor: '#FEE500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  kakaoButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  existingMemberContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  existingMemberText: {
    color: '#8F9BB3',
    marginBottom: 8,
  },
  loginButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 64,
  },
  loginButtonText: {
    color: '#101828',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default KakaoLoginScreen;
