import { View } from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { useState } from 'react';
import { Asset } from 'expo-asset';

export const WalkMap = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [markerImageUri, setMarkerImageUri] = useState<string>('');

  const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6404c724c826b9ad95ac2ceb32160a4b&libraries=services,clusterer,drawing"></script> 
    </head>
    <body>
        <div id="map" style="width:100%; height:100%;"></div>
        <script type="text/javascript">
            (function () {
                const container = document.getElementById('map');
                const currentPosition = new kakao.maps.LatLng(${location?.coords.latitude ?? 0}, ${
                  location?.coords.longitude ?? 0
                });
                
                const options = {
                    center: currentPosition,
                    level: 3
                };
                
                const map = new kakao.maps.Map(container, options);
                
                // 마커 이미지 설정
                const imageSrc = '${markerImageUri}';
                const imageSize = new kakao.maps.Size(40, 45.22);
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                
                // 마커 생성 - title 제거하고 image 추가
                const marker = new kakao.maps.Marker({
                    position: currentPosition,
                    map: map,
                    image: markerImage
                });
                
                // 지도 범위 재설정
                const bounds = new kakao.maps.LatLngBounds();
                bounds.extend(currentPosition);
                map.setBounds(bounds);
                
                // 주소-좌표 변환 객체 생성
                const geocoder = new kakao.maps.services.Geocoder();
            })();
        </script>       
    </body>
</html>    
`;

  useEffect(() => {
    const loadMarkerImage = async () => {
      try {
        const asset = Asset.fromModule(require('../../../../../assets/images/marker.png'));
        await asset.downloadAsync();
        setMarkerImageUri(asset.uri);
      } catch (error) {
        console.error('마커 이미지 로드 실패:', error);
      }
    };

    loadMarkerImage();
  }, []);

  useEffect(() => {
    // 위치 권한 요청 및 위치 추적 시작
    const startLocationTracking = async () => {
      try {
        // 위치 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('위치 불러오기 실패: 위치 권한이 거부되었습니다.');
          return;
        }

        // 첫 위치 정보 가져오기
        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(initialLocation);

        // 실시간 위치 추적 시작
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // 5초마다 업데이트
            distanceInterval: 5, // 5미터마다 업데이트
          },
          (newLocation) => {
            setLocation(newLocation);
          },
        );

        // 컴포넌트 언마운트 시 구독 해제
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      } catch (error) {
        console.error(error);
      }
    };

    startLocationTracking();
  }, []);

  return (
    <View style={{ width: '100%', height: 320, overflow: 'hidden' }}>
      <WebView style={{ flex: 1 }} source={{ html }} />
    </View>
  );
};
