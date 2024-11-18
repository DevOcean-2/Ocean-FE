import LocalImage from '@/src/shared/ui/LocalImage';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ImageSourcePropType } from 'react-native';
import Check from '@/assets/svgs/check-box.svg';

type CustomButtonProps = {
  imageUri?: string;
  label: string;
  subLabel?: string;
  onPress: () => void;
  selected?: boolean;
};

const imageMapping: {
  [key: string]: { selected: ImageSourcePropType; unselected: ImageSourcePropType };
} = {
  small: {
    selected: require('@/assets/images/select-small-dog.png'),
    unselected: require('@/assets/images/un-select-small-dog.png'),
  },
  medium: {
    selected: require('@/assets/images/select-medium-dog.png'),
    unselected: require('@/assets/images/un-select-medium-dog.png'),
  },
  large: {
    selected: require('@/assets/images/select-large-dog.png'),
    unselected: require('@/assets/images/un-select-large-dog.png'),
  },
  // 필요한 다른 이미지들도 여기에 추가
};

const CustomImageButton: React.FC<CustomButtonProps> = ({
  imageUri,
  label,
  subLabel,
  onPress,
  selected,
}) => {
  const getImageSource = () => {
    if (imageUri && imageMapping[imageUri]) {
      return selected ? imageMapping[imageUri].selected : imageMapping[imageUri].unselected;
    }
    return null;
  };

  return (
    <TouchableOpacity style={[styles.button, selected && styles.selectedButton]} onPress={onPress}>
      <View style={styles.container}>
        <Check
          width={24}
          height={24}
          fill="white"
          style={[styles.checkStyle, { opacity: selected ? 1 : 0 }]}
        />

        <View style={styles.textContainer}>
          {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
          <Text style={[styles.buttonText, selected && styles.label]}>{label}</Text>
        </View>
        {imageUri && (
          <LocalImage
            key={`${imageUri}-${selected ? 'selected' : 'unselected'}`}
            source={getImageSource()}
            style={{ width: 100, height: 100 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,

    marginHorizontal: 5,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 6,
    width: 120,
    justifyContent: 'center',
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
  checkStyle: {
    marginRight: 15,
  },
});

export default CustomImageButton;
