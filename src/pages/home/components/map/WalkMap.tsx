import { View } from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as Location from 'expo-location';

interface WalkMapProps {
  currentLocation: Location.LocationObject | null;
}

export const WalkMap: React.FC<WalkMapProps> = ({ currentLocation }) => {
  const [markerImageUri, setMarkerImageUri] = useState<string>('');

  // 롯데타워 목표 지점 좌표
  const TARGET = {
    latitude: 37.5126,
    longitude: 127.1025,
  };

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
                const targetPosition = new kakao.maps.LatLng(${TARGET.latitude}, ${TARGET.longitude});
                const currentPosition = new kakao.maps.LatLng(${currentLocation?.coords.latitude ?? TARGET.latitude}, ${currentLocation?.coords.longitude ?? TARGET.longitude});
                
                const options = {
                    center: currentPosition,
                    level: 3
                };
                
                const map = new kakao.maps.Map(container, options);
                
                // 50m 반경 원 그리기
                const circle = new kakao.maps.Circle({
                    center: targetPosition,
                    radius: 50,
                    strokeWeight: 2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    fillColor: '#FF0000',
                    fillOpacity: 0.3
                });
                circle.setMap(map);

                // 목표 지점 마커
                const targetMarker = new kakao.maps.Marker({
                    position: targetPosition,
                    map: map
                });
                
                // 현재 위치 마커
                const imageSrc = '${markerImageUri}';
                const imageSize = new kakao.maps.Size(40, 45.22);
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                
                const marker = new kakao.maps.Marker({
                    position: currentPosition,
                    map: map,
                    image: markerImage
                });
                
                // 지도 범위 재설정
                const bounds = new kakao.maps.LatLngBounds();
                bounds.extend(targetPosition);
                bounds.extend(currentPosition);
                map.setBounds(bounds);
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
