import { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import CategoryList from './components/cateogoryList';
import PlaceList from './components/placeList';
import BookMarkModal from './components/bookmark/bookmarkModal';
import { useKeywordSearch } from './api/kakaoSearch';
import { useCurrentLocation } from '../home/hooks';
import KakaoMapView from './components/kakaoMapWebview';

const PlaceComponent = () => {
  const { location } = useCurrentLocation();
  const [keyword, setKeyword] = useState('판교맛집');
  const [searchQuery, setSearchQuery] = useState(keyword);
  const [sortType, setSortType] = useState<'accuracy' | 'distance'>('accuracy');

  const { data, isLoading, error } = useKeywordSearch({
    query: searchQuery,
    size: 15,
    sort: sortType,
    x: location ? location.longitude.toString() : undefined,
    y: location ? location.latitude.toString() : undefined,
  });

  const handleSearch = () => {
    setSearchQuery(keyword);
  };

  const formatResults = (places: any[]) => {
    return places.map((place) => ({
      name: place.place_name,
      type: place.category_group_name,
      // distance가 있을 때만 km로 변환하여 표시
      distance: place.distance ? `${(parseInt(place.distance) / 1000).toFixed(1)}km` : '',
      address: place.road_address_name || place.address_name,
      images:
        Array.isArray(place.photos) && place.photos.length > 0
          ? place.photos
          : Array(4).fill(require('@/assets/images/select-large-dog.png')),
    }));
  };

  useEffect(() => {
    if (location) {
      setSortType('distance'); // 위치가 있으면 거리순으로 정렬
    } else {
      setSortType('accuracy'); // 위치가 없으면 정확도순으로 정렬
    }
  }, [location]);

  return (
    <View style={{ flex: 1, height: Dimensions.get('window').height }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="검색어를 입력하세요"
          onSubmitEditing={handleSearch}
        />
        <Button title="검색" onPress={handleSearch} />
      </View>

      {location && <KakaoMapView latitude={location.latitude} longitude={location.longitude} />}

      <BookMarkModal />
      <CategoryList />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text>검색 중 오류가 발생했습니다.</Text>
          <Text>{(error as any)?.message}</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {data?.documents &&
            formatResults(data.documents).map((place, index) => (
              <PlaceList key={index} {...place} />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  searchContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default PlaceComponent;
