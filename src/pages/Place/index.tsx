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

const PlaceComponent = () => {
  const [keyword, setKeyword] = useState('판교맛집');
  const [searchQuery, setSearchQuery] = useState(keyword);

  const { data, isLoading, error } = useKeywordSearch({
    query: searchQuery,
    size: 15,
    sort: 'accuracy',
  });

  const handleSearch = () => {
    setSearchQuery(keyword);
  };

  const formatResults = (places: any[]) => {
    console.log(Array.isArray(places.map((x) => x.photos)), places.map((x) => x.photos).length);
    return places.map((place) => ({
      name: place.place_name,
      type: place.category_group_name,
      distance: place.distance ? `${(parseInt(place.distance) / 1000).toFixed(1)}km` : '',
      address: place.road_address_name || place.address_name,
      images:
        Array.isArray(place.photos) && place.photos.length > 0
          ? place.photos
          : Array(4).fill(require('@/assets/images/select-large-dog.png')),
    }));
  };

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
