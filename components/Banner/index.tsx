import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Info from '@/assets/svgs/info.svg';

interface BannerProps {
  title: string;
  subtitle: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  iconWidth?: number;
  iconHeight?: number;
}

export const Banner = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
  iconWidth = 20,
  iconHeight = 20,
}: BannerProps) => {
  return (
    <View style={[BannerStyles.bannerContainer, containerStyle]}>
      <Info width={iconWidth} height={iconHeight} />
      <View>
        <Text style={[BannerStyles.bannerTitle, titleStyle]}>{title}</Text>
        <Text style={[BannerStyles.bannerSubTitle, subtitleStyle]}>{subtitle}</Text>
      </View>
    </View>
  );
};

const BannerStyles = StyleSheet.create({
  bannerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#D0D5DD33',
    paddingHorizontal: 12,
    gap: 15,
    paddingVertical: 20,
    marginBottom: 40,
  },

  bannerTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 5,
    color: '#04c755',
  },
  bannerSubTitle: {
    fontSize: 13,
    fontWeight: 400,
    color: '#101828',
  },
});
