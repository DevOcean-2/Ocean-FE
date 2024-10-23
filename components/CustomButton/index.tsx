import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

type CustomButtonProps = {
  label: string;
  subLabel?: string;
  onPress: () => void;
  selected?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ label, subLabel, onPress, selected }) => (
  <TouchableOpacity style={[styles.button, selected && styles.selectedButton]} onPress={onPress}>
    <View>
      {subLabel && <Text>{subLabel}</Text>}
      <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#F1FFF2',
    borderColor: '#04C755',
  },
  buttonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#101828',
    fontWeight: '600',
  },
});

export default CustomButton;
