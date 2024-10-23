import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

interface SwitchButtonProps {
  isMain: boolean;
  mainLabel: string;
  subLabel: string;
  toggle: () => void;
}

export const SwitchButton = (props: SwitchButtonProps) => {
  const { mainLabel, subLabel, toggle, isMain } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={toggle}>
      <Text style={[styles.option, isMain ? styles.activeLeft : styles.inactiveLeft]}>
        {mainLabel}
      </Text>
      <Text style={[styles.option, isMain ? styles.inactiveRight : styles.activeRight]}>
        {subLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    width: '50%',
    textAlign: 'center',
    fontSize: 13,
  },
  activeLeft: {
    color: 'white',
    fontWeight: 'bold',
    height: '100%',
    verticalAlign: 'middle',
    backgroundColor: '#13E67D',
    borderRadius: 18,
    width: 'auto',
    paddingHorizontal: 12,
  },
  activeRight: {
    color: 'white',
    fontWeight: 'bold',
    height: '100%',
    verticalAlign: 'middle',
    backgroundColor: '#13E67D',
    borderRadius: 18,
    width: 'auto',
    paddingLeft: 8,
    paddingRight: 16,
  },
  inactiveLeft: {
    color: '#5E5E5E',
    height: '100%',
    verticalAlign: 'middle',
    borderRadius: 18,
    width: 'auto',
    paddingHorizontal: 12,
  },
  inactiveRight: {
    color: '#5E5E5E',
    height: '100%',
    verticalAlign: 'middle',
    borderRadius: 18,
    width: 'auto',
    paddingLeft: 8,
    paddingRight: 16,
  },
});
