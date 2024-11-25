import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { atom, useAtom } from 'jotai';

const sortTypeAtom = atom<'location' | 'distance'>('location');
const selectedOptionAtom = atom<string>('지도중심');

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onPress }) => (
  <TouchableOpacity style={[styles.chip, active && styles.activeChip]} onPress={onPress}>
    <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
  </TouchableOpacity>
);

const SortingComponent = () => {
  const [sortType, setSortType] = useAtom(sortTypeAtom);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [modalVisible, setModalVisible] = useState(false);

  const locationOptions = ['지도중심', '내 위치'];
  const distanceOptions = ['정확도순', '거리순'];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        <Chip
          label="지도중심"
          active={sortType === 'location'}
          onPress={() => {
            setSortType('location');
            setModalVisible(true);
          }}
        />
        <Chip
          label="거리순"
          active={sortType === 'distance'}
          onPress={() => {
            setSortType('distance');
            setModalVisible(true);
          }}
        />
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
                {selectedOption === option && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeChip: {
    backgroundColor: '#e0e0e0',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  activeChipText: {
    color: '#000',
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
