import React, { useEffect, useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { ICON_ARROW_RIGHT, ICON_CALENDAR, ICON_CHECK, ICON_FIRE_WALK } from '@/assets/svgs';
import { WalkPositionInfo } from '../components/home/location';
import { WalkMap } from '../components/map/WalkMap';
import { CurrentMissionCarousel } from '../components/walk/CurrentMissionCarousel';
import { useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';
import {
  useCheckMission,
  useCompleteWalkMission,
  useMissionList,
  useMyActivity,
  useStartMission,
} from '../hooks';
import { MissionSuccessDialog } from '../components/dialog';
import { NotificationStorage } from '@/src/shared/notification/notification';

export const Walk = () => {
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [positions, setPositions] = useState<Location.LocationObject[]>([]);

  // 시연용 count state
  const [count, setCount] = useState<number>(0);

  const router = useRouter();
  const timeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const missionCheckIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [successMissionType, setSuccessMissionType] = useState<
    'FEED' | 'TREASURE_HUNT' | 'LANDMARK'
  >();

  const { data: activityData } = useMyActivity('2024-11-19');
  const { data: missionList } = useMissionList();

  const { mutate: startFeedMission } = useStartMission('FEED');
  const { mutate: startTreasureMission } = useStartMission('TREASURE_HUNT');
  const { mutate: startLandmarkMission } = useStartMission('LANDMARK');
  const { mutate: checkLandmarkMission } = useCheckMission('LANDMARK');
  const { mutate: checkTreasureHuntMission } = useCheckMission('TREASURE_HUNT');

  const { mutate: completeTreasureMission } = useCompleteWalkMission('TREASURE_HUNT');
  const { mutate: completeLandmarkMission } = useCompleteWalkMission('LANDMARK');

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateCalories = (timeInSeconds: number, distanceInKm: number) => {
    // MET value for walking (약 4km/h 기준 3.0)
    const MET = 3.0;
    // 체중 (kg) - 기본값 65kg로 가정
    const weight = 65;

    // 칼로리 = MET * 체중(kg) * 시간(hour)
    const hours = timeInSeconds / 3600;
    return Math.round(MET * weight * hours);
  };

  const updateLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('위치 권한이 필요합니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(location);

      if (positions.length > 0) {
        const lastPos = positions[positions.length - 1];
        const newDistance = calculateDistance(
          lastPos.coords.latitude,
          lastPos.coords.longitude,
          location.coords.latitude,
          location.coords.longitude,
        );
        setDistance((prev) => prev + newDistance);
      }

      setPositions((prev) => [...prev, location]);
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const checkMissions = () => {
    if (!missionList || missionList.length === 0) return;
    console.log('start check missions:', count);

    if (count < 2) {
      console.log('Fail Checking missions:', count);
      const currentCoords = {
        latitude: currentLocation?.coords?.latitude ?? 0,
        longitude: currentLocation?.coords?.longitude ?? 0,
      };

      missionList.forEach((mission) => {
        if (mission.missionType === 'TREASURE_HUNT') {
          checkTreasureHuntMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('TREASURE_HUNT');
                }
              });
            },
          });
        } else if (mission.missionType === 'LANDMARK') {
          checkLandmarkMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('LANDMARK');
                }
              });
            },
          });
        }
      });

      setCount((prev) => prev + 1);
    } else {
      console.log('Success Checking missions:', count);

      const currentCoords = {
        latitude: 37.450169463,
        longitude: 126.655214526,
      };

      missionList.forEach((mission) => {
        if (mission.missionType === 'TREASURE_HUNT') {
          checkTreasureHuntMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('TREASURE_HUNT');

                  NotificationStorage.save({
                    title: '보물찾기 미션 완료!',
                    type: 'MISSION',
                    body: '보물찾기 미션을 성공적으로 완료했습니다.',
                    status: 'SUCCESS',
                  });
                }
              });
            },
          });
        } else if (mission.missionType === 'LANDMARK') {
          checkLandmarkMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('LANDMARK');

                  NotificationStorage.save({
                    title: '랜드마크 미션 완료!',
                    type: 'MISSION',
                    body: '랜드마크 미션을 성공적으로 완료했습니다.',
                    status: 'SUCCESS',
                  });
                }
              });
            },
          });
        }
      });

      setCount(0);
    }
  };

  const startIntervals = () => {
    timeIntervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    locationIntervalRef.current = setInterval(updateLocation, 5000);
    missionCheckIntervalRef.current = setInterval(checkMissions, 10000);
  };

  const stopIntervals = () => {
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    if (missionCheckIntervalRef.current) clearInterval(missionCheckIntervalRef.current);
  };

  const handleStartWalk = async () => {
    try {
      // 미션 시작
      if (missionList && missionList.length > 0) {
        missionList.forEach((mission) => {
          if (mission.missionType === 'FEED') {
            startFeedMission();
          } else if (mission.missionType === 'TREASURE_HUNT') {
            startTreasureMission();
          } else if (mission.missionType === 'LANDMARK') {
            startLandmarkMission();
          }
        });
      }

      // 초기 위치 설정
      await updateLocation();

      // 인터벌 시작
      startIntervals();

      setIsWalking(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Walk start error:', error);
      alert('산책을 시작할 수 없습니다.');
    }
  };

  const handlePauseWalk = () => {
    stopIntervals();
    setIsPaused(true);
  };

  const handleResumeWalk = () => {
    startIntervals();
    setIsPaused(false);
  };

  const handleFinishWalk = () => {
    stopIntervals();

    if (missionList && missionList.length > 0) {
      missionList.forEach((mission) => {
        if (mission.missionType === 'TREASURE_HUNT') {
          completeTreasureMission();
        } else if (mission.missionType === 'LANDMARK') {
          completeLandmarkMission();
        }
      });

      const currentCoords = {
        latitude: 37.450169463,
        longitude: 126.655214526,
      };

      missionList.forEach((mission) => {
        if (mission.missionType === 'TREASURE_HUNT') {
          checkTreasureHuntMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('TREASURE_HUNT');

                  NotificationStorage.save({
                    title: '보물찾기 미션 완료!',
                    type: 'MISSION',
                    body: '보물찾기 미션을 성공적으로 완료했습니다.',
                    status: 'SUCCESS',
                  });
                } else {
                  NotificationStorage.save({
                    title: '보물찾기 미션 실패!',
                    type: 'MISSION',
                    body: '보물찾기 미션을 실패했습니다.',
                    status: 'ERROR',
                  });
                }
              });
            },
          });
        } else if (mission.missionType === 'LANDMARK') {
          checkLandmarkMission(currentCoords, {
            onSuccess: (missionList) => {
              missionList.map((mission) => {
                if (mission.complete) {
                  setOpenSuccessDialog(true);
                  setSuccessMissionType('LANDMARK');

                  NotificationStorage.save({
                    title: '랜드마크 미션 완료!',
                    type: 'MISSION',
                    body: '랜드마크 미션을 성공적으로 완료했습니다.',
                    status: 'SUCCESS',
                  });
                } else {
                  NotificationStorage.save({
                    title: '랜드마크 미션 실패!',
                    type: 'MISSION',
                    body: '랜드마크 미션을 실패했습니다.',
                    status: 'ERROR',
                  });
                }
              });
            },
          });
        }
      });
    }

    // TODO: 산책 데이터 서버에 저장
    console.log('Walk finished:', {
      time: elapsedTime,
      distance,
      calories,
      positions,
    });

    setIsWalking(false);
    setIsPaused(false);
    setElapsedTime(0);
    setDistance(0);
    setCalories(0);
    setPositions([]);
    setCurrentLocation(null);
  };

  // 칼로리 계산 effect
  useEffect(() => {
    setCalories(calculateCalories(elapsedTime, distance));
  }, [elapsedTime, distance]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopIntervals();
    };
  }, []);

  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <WalkPositionInfo />
      </View>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <WalkMap />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>시간</Text>
            <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>거리</Text>
            <Text style={styles.statValue}>{distance.toFixed(2)} km</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>칼로리</Text>
            <Text style={styles.statValue}>{calories} kcal</Text>
          </View>
        </View>

        <View style={{ marginTop: 24, paddingHorizontal: 20, width: '100%' }}>
          <CurrentMissionCarousel />

          <TouchableOpacity onPress={() => router.push(PublicWalkEntryLink.walkActivity)}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>내 활동</Text>
              <ICON_ARROW_RIGHT style={{ marginLeft: 'auto' }} />
            </View>
          </TouchableOpacity>

          <View style={styles.activityList}>
            {activityData?.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityDate}>
                  <ICON_CALENDAR />
                  <Text style={styles.dateText}>시간:분</Text>
                </View>
                <View style={styles.activityStats}>
                  <View style={styles.statGroup}>
                    <Text style={styles.statGroupLabel}>시간</Text>
                    <Text style={styles.statGroupValue}>{activity?.time ?? 0} 시간</Text>
                  </View>
                  <View style={styles.statGroup}>
                    <Text style={styles.statGroupLabel}>거리</Text>
                    <Text style={styles.statGroupValue}>
                      {activity?.distance?.toFixed(1) ?? 0} km
                    </Text>
                  </View>
                  <View style={styles.statGroup}>
                    <Text style={styles.statGroupLabel}>칼로리</Text>
                    <Text style={styles.statGroupValue}>{activity?.kcal ?? 0} kcal</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {!isWalking ? (
          <Button style={styles.startButton} onPress={handleStartWalk}>
            <Text style={styles.startButtonText}>산책 시작</Text>
            <ICON_FIRE_WALK />
          </Button>
        ) : (
          <>
            <Button
              style={styles.pauseButton}
              onPress={isPaused ? handleResumeWalk : handlePauseWalk}
            >
              <Text style={styles.pauseButtonText}>{isPaused ? '다시 시작' : '일시 정지'}</Text>
            </Button>
            <Button style={styles.finishButton} onPress={handleFinishWalk}>
              <Text style={styles.finishButtonText}>산책 완료</Text>
              <ICON_CHECK />
            </Button>
          </>
        )}
      </View>
      <MissionSuccessDialog
        isVisible={openSuccessDialog}
        onDismiss={() => setOpenSuccessDialog(false)}
        missionType={successMissionType ?? 'TREASURE_HUNT'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    height: 40,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statItem: {
    flexDirection: 'column',
    gap: 4,
  },
  statLabel: {
    color: '#8F9BB3',
    fontSize: 12,
    fontWeight: '400',
  },
  statValue: {
    color: '#101426',
    fontSize: 20,
    fontWeight: '600',
  },
  activityHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'white',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
  },
  activityList: {
    flexDirection: 'column',
    gap: 6,
    marginBottom: 40,
  },
  activityItem: {
    height: 70,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDF1F7',
    flexDirection: 'column',
    gap: 6,
  },
  activityDate: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  dateText: {
    color: '#8F9BB3',
    fontSize: 14,
    fontWeight: '400',
  },
  activityStats: {
    flexDirection: 'row',
    gap: 10,
  },
  statGroup: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  statGroupLabel: {
    color: '#8F9BB3',
    fontSize: 14,
    fontWeight: '400',
  },
  statGroupValue: {
    color: '#101426',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 9,
    top: 400,
    width: '100%',
    justifyContent: 'center',
  },
  startButton: {
    width: 167,
    height: 54,
    backgroundColor: '#04C755',
    borderRadius: 10,
    gap: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pauseButton: {
    width: 167,
    height: 54,
    backgroundColor: 'white',
    borderColor: '#04C755',
    borderWidth: 1,
    borderRadius: 10,
  },
  pauseButtonText: {
    color: '#04C755',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButton: {
    width: 167,
    height: 54,
    backgroundColor: '#04C755',
    borderRadius: 10,
    gap: 6,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
