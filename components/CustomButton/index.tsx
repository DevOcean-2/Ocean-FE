import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CustomButtonProps = {
  label: string;
  onPress: () => void;
  selected?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ label, onPress, selected }) => (
  <TouchableOpacity style={[styles.button, selected && styles.selectedButton]} onPress={onPress}>
    <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>{label}</Text>
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
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'white',
  },
});

export default CustomButton;
