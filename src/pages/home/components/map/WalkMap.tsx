import { View } from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';
import { useState } from 'react';
import { Asset } from 'expo-asset';
import { useCurrentLocation } from '../../hooks';

export const WalkMap = () => {
  const { location } = useCurrentLocation();
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
                const currentPosition = new kakao.maps.LatLng(${location?.latitude ?? 0}, ${
                  location?.longitude ?? 0
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

  return (
    <View style={{ width: '100%', height: 320, overflow: 'hidden' }}>
      <WebView style={{ flex: 1 }} source={{ html }} />
    </View>
  );
};
