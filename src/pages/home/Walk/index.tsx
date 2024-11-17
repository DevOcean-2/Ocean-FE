import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { ICON_ARROW_RIGHT, ICON_CALENDAR, ICON_CHECK, ICON_FIRE_WALK } from '@/assets/svgs';
import { useState } from 'react';
import { PositionInfo } from '../components/home/location';
import { WalkMap } from '../components/map/WalkMap';
import { CurrentMissionCarousel } from '../components/walk/CurrentMissionCarousel';
import { Link, useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';
import { NotificationStorage } from '@/src/shared/notification/notification';

export const Walk = () => {
  const [isWalking, setIsWalking] = useState<boolean>(false);

  const router = useRouter();
  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <PositionInfo />
        <Text
          onPress={async () => {
            console.log('test');
            await NotificationStorage.save({
              title: '미션을 완료했어요!',
              body: '칼로리 5000KCAL 달성하기',
              type: 'MISSION',
              status: 'SUCCESS',
            });
          }}
        >
          fkeopwfkeopwfkeopfkeopfewokfpewkfopewkfpoewfkeop
        </Text>
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
              0 km
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
              0 kcal
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, paddingHorizontal: 20, width: '100%' }}>
          <CurrentMissionCarousel />

          <TouchableOpacity onPress={() => router.push(PublicWalkEntryLink.walkActivity)}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 24,
                backgroundColor: 'white',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  lineHeight: 20,
                }}
              >
                내 활동
              </Text>
              <ICON_ARROW_RIGHT style={{ marginLeft: 'auto' }} />
            </View>
          </TouchableOpacity>

          <View style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 40 }}>
            <View
              style={{
                height: 70,
                padding: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#EDF1F7',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <ICON_CALENDAR />
                <Text
                  style={{
                    color: '#8F9BB3',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  시간:분
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    시간
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0:20:10
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    거리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 km
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    칼로리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 kcal
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 70,
                padding: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#EDF1F7',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <ICON_CALENDAR />
                <Text
                  style={{
                    color: '#8F9BB3',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  시간:분
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    시간
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0:20:10
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    거리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 km
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    칼로리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 kcal
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 70,
                padding: 16,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#EDF1F7',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <ICON_CALENDAR />
                <Text
                  style={{
                    color: '#8F9BB3',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  시간:분
                </Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    시간
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0:20:10
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    거리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 km
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#8F9BB3',
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    칼로리
                  </Text>
                  <Text
                    style={{
                      color: '#101426',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    0 kcal
                  </Text>
                </View>
              </View>
            </View>
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
          width: '100%',
          justifyContent: 'center',
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
