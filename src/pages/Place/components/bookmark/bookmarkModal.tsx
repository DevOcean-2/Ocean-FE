import { useRef, useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ICON_BOOKMARK } from '@/assets/svgs';
import { Link, usePathname } from 'expo-router';

const bookMarkOption = [
  {
    id: 1,
    count: 43,
    name: '댕댕이 맛집 리스트',
  },
  {
    id: 2,
    count: 55,
    name: '댕댕이 맛집 리스트2',
  },
  {
    id: 3,
    count: 2,
    name: '댕댕이 맛집 리스트3',
  },
];

const BookMarkModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
          <ICON_BOOKMARK />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>즐겨찾기</Text>
            {bookMarkOption.map((option) => (
              <Link
                href={`/bookmarkList?id=${option.id}`}
                key={option.id}
                onPress={() => setIsModalVisible(false)}
              >
                <TouchableOpacity style={styles.optionItem}>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <Text style={styles.optionCountText}>{option.count}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalButtonContainer: {
    position: 'absolute',
    top: 210,
    right: 20,
  },
  button: {
    flexDirection: 'row',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 18,
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
  },

  optionCountText: {
    color: '#8F9BB3',
    fontSize: 12,
    fontWeight: '400',
  },

  bookmarkList: {
    maxHeight: 300,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default BookMarkModal;
