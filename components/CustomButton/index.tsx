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
    <View style={styles.textContainer}>
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      <Text style={[styles.buttonText, selected && styles.label]}>{label}</Text>
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
  textContainer: {
    flexDirection: 'column',
    gap: 6,
    textAlign: 'left',
  },
  label: {
    fontSize: 20,
    fontWeight: 500,
    color: '#222B45',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F9BB3',
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
});

export default CustomButton;
