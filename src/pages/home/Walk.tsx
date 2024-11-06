import { Button, Text, View } from 'react-native-ui-lib';
import { WalkMap } from './components/map/WalkMap';
import { PositionInfo } from './components/home/location';
import { ICON_CHECK, ICON_FIRE_WALK } from '@/assets/svgs';
import { useState } from 'react';

export const Walk = () => {
  const [isWalking, setIsWalking] = useState<boolean>(false);

  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <PositionInfo />
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <WalkMap />
        <View
          style={{
            height: 40,
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Text
              style={{
                color: '#8F9BB3',
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              시간
            </Text>
            <Text
              style={{
                color: '#101426',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              0:00:00
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Text
              style={{
                color: '#8F9BB3',
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              거리
            </Text>
            <Text
              style={{
                color: '#101426',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              0KM
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Text
              style={{
                color: '#8F9BB3',
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              칼로리
            </Text>
            <Text
              style={{
                color: '#101426',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              0KCAL
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          gap: 9,
          top: 400,
          left: '50%', // 부모 기준 50% 위치로
          transform: [{ translateX: -171.5 }], // (167 * 2 + 9) / 2 = 171.5
          // 두 버튼의 너비(167*2)와 gap(9)의 절반만큼 왼쪽으로 이동
        }}
      >
        {!isWalking ? (
          <Button
            style={{
              width: 167,
              height: 54,
              backgroundColor: '#04C755',
              borderRadius: 10,
              gap: 6,
            }}
            onPress={() => setIsWalking(true)}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              산책 시작
            </Text>
            <ICON_FIRE_WALK />
          </Button>
        ) : (
          <>
            <Button
              style={{
                width: 167,
                height: 54,
                backgroundColor: 'white',
                borderColor: '#04C755',
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => setIsWalking(false)}
            >
              <Text
                style={{
                  color: '#04C755',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                일시 정지
              </Text>
            </Button>
            <Button
              style={{
                width: 167,
                height: 54,
                backgroundColor: '#04C755',
                borderRadius: 10,
                gap: 6,
              }}
              onPress={() => setIsWalking(false)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                산책 완료
              </Text>
              <ICON_CHECK />
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
