import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { atom, useAtom } from 'jotai';
import { ICON_ARROW_DOWN } from '@/assets/svgs';

const sortTypeAtom = atom<'location' | 'distance'>('location');
const locationOptionAtom = atom<string>('지도중심');
const distanceOptionAtom = atom<string>('정확도순');

const SortingComponent = () => {
  const [sortType, setSortType] = useAtom(sortTypeAtom);
  const [locationOption, setLocationOption] = useAtom(locationOptionAtom);
  const [distanceOption, setDistanceOption] = useAtom(distanceOptionAtom);
  const [modalVisible, setModalVisible] = useState(false);

  const locationOptions = ['지도중심', '내 위치'];
  const distanceOptions = ['정확도순', '거리순'];

  const handleOptionSelect = (option: string) => {
    if (sortType === 'location') {
      setLocationOption(option);
    } else {
      setDistanceOption(option);
    }
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSortType('location');
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>{locationOption}</Text>
          <ICON_ARROW_DOWN />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSortType('distance');
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>{distanceOption}</Text>
          <ICON_ARROW_DOWN />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {sortType === 'location' ? '어떤 중심으로 검색할까요?' : '장소 결과를 이렇게 볼까요?'}
            </Text>
            {(sortType === 'location' ? locationOptions : distanceOptions).map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionItem}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
                {(sortType === 'location' ? locationOption : distanceOption) === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    gap: 4,
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
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
  checkmark: {
    color: '#4CAF50',
    fontSize: 18,
  },
});

export default SortingComponent;
