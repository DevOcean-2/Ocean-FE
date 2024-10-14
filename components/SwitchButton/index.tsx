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
      <View style={[styles.switch, isMain ? styles.switchLeft : styles.switchRight]}>
        <Text style={styles.switchText}>{isMain ? mainLabel : subLabel}</Text>
      </View>
      <Text style={[styles.option, isMain ? styles.activeLeft : styles.inactiveRight]}>
        {mainLabel}
      </Text>
      <Text style={[styles.option, isMain ? styles.inactiveLeft : styles.activeRight]}>
        {subLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    padding: 2,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    position: 'absolute',
    width: '50%',
    height: '90%',
    backgroundColor: '#13E67D',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchLeft: {
    left: '2%',
  },
  switchRight: {
    right: '2%',
  },
  switchText: {
    color: 'white',
    fontWeight: 'bold',
  },
  option: {
    width: '50%',
    textAlign: 'center',
    fontSize: 16,
  },
  activeLeft: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeRight: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveLeft: {
    color: '#5E5E5E',
  },
  inactiveRight: {
    color: '#5E5E5E',
  },
});
