import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

interface KakaoMapViewProps {
  latitude: number;
  longitude: number;
}

const KakaoMapView: React.FC<KakaoMapViewProps> = ({ latitude, longitude }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <title>Kakao Map</title>
        <style>
          body, html { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            height: 100%; 
          }
          #map { 
            width: 100%; 
            height: 100%; 
            position: absolute; 
            top: 0; 
            left: 0; 
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6404c724c826b9ad95ac2ceb32160a4b&libraries=services"></script> 
        <script type="text/javascript">
          window.onload = function() {
            var container = document.getElementById('map');
            var options = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: 3
            };
            var map = new kakao.maps.Map(container, options);
            
            var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
            var marker = new kakao.maps.Marker({
              position: markerPosition
            });
            marker.setMap(map);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});

export default KakaoMapView;
