import { View, ViewProps } from 'react-native-ui-lib';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { children, style, ...rest } = props;
  return (
    <View
      {...rest}
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
