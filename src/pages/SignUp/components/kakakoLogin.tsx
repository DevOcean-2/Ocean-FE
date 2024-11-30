import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useState } from 'react';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href);`;

export default function KakaoLoginScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event: any) => {
    const { data } = event.nativeEvent;

    // URL에서 인증 코드 추출
    if (data.includes('code=')) {
      const exp = 'code=';
      const condition = data.indexOf(exp);
      if (condition !== -1) {
        const authorize_code = data.substring(condition + exp.length);
        console.log('인증 코드:', authorize_code);
        // 여기서 인증 코드를 처리하는 로직 추가
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FEE500" />
        </View>
      )}

      <WebView
        style={styles.webview}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.EXPO_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.EXPO_PUBLIC_REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingContainer: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
