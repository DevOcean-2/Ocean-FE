import { useLocalSearchParams, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const places = [
  {
    id: 1,
    name: '명명 AI 음식점',
    distance: '13km',
    address: '경기 성남시 분당구 판교공원로3길 24 1층',
  },
];

const BookmarkList = () => {
  const { id } = useLocalSearchParams();
  const pathname = usePathname();
  console.log(pathname);
  console.log(id);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>댕댕이 맛집 리스트</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>전체</Text>
          <Text style={styles.filterText}>등록순</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>편집</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>즐겨찾기는 300개까지 추가할 수 있어요</Text>
      </View>

      {places.map((place) => (
        <View key={place.id} style={styles.placeItem}>
          <TouchableOpacity style={styles.bookmark}>
            <Text>🏷️</Text>
          </TouchableOpacity>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.placeDistance}>{place.distance}</Text>
            <Text style={styles.placeAddress}>{place.address}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text>⋮</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  filterText: {
    color: '#666',
  },
  editButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
  },
  infoText: {
    color: '#666',
    fontSize: 12,
  },
  placeItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  bookmark: {
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  placeDistance: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  placeAddress: {
    color: '#666',
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
});

export default BookmarkList;
