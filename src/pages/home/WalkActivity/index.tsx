import { View, Text } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, MainLayout } from '../components/frame';
import { WalkActivityHeader } from './WalkActivityHeader';
import { ICON_CALENDAR, ICON_CHEVRON_LEFT, ICON_CHEVRON_RIGHT } from '@/assets/svgs';
import { Image } from '@/src/shared/ui';
import { MissionItem } from '../components/home/mission';
import { useMissionList } from '../hooks';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
};

LocaleConfig.defaultLocale = 'kr';

export const WalkActivity = () => {
  const [selected, setSelected] = useState<{
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }>();

  const { data } = useMissionList();

  const getInitialDate = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, []);

  const today = useMemo(() => getInitialDate(), [getInitialDate]);

  useEffect(() => {
    setSelected({
      dateString: today,
      day: new Date(today).getDate(),
      month: new Date(today).getMonth() + 1,
      year: new Date(today).getFullYear(),
      timestamp: new Date(today).getTime(),
    });
  }, []);

  return (
    <MainLayout header={<WalkActivityHeader />}>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 16,
        }}
      >
        <Calendar
          initialDate={getInitialDate()}
          hideExtraDays
          enableSwipeMonths
          monthFormat="yyyy년 MM월"
          onDayPress={(day: any) => {
            setSelected(day);
          }}
          renderArrow={(direction: 'left' | 'right') =>
            direction === 'left' ? (
              <View style={{ flex: 1 }}>
                <ICON_CHEVRON_LEFT />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <ICON_CHEVRON_RIGHT />
              </View>
            )
          }
          markedDates={{
            [selected?.dateString ?? '']: { selected: true, disableTouchEvent: true },
            // '2024-11-20': { marked: true, dotColor: '#04C755' },
          }}
          theme={{
            backgroundColor: '#ffffff',
            selectedDayBackgroundColor: '#04C755',
            textSectionTitleColor: '#000',
            todayTextColor: '#00adf5',
            dayTextColor: '#000000',
            textMonthFontWeight: '600',
            textMonthFontSize: 16,
          }}
        />

        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            활동 데이터
          </Text>
          <Card style={{ borderColor: '#EDF1F7', borderWidth: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View style={styles.dateContainer}>
                  <ICON_CALENDAR />
                  <Text style={styles.dateText}>{selected?.dateString ?? ''}</Text>
                </View>

                {/* Stats Container */}
                <View style={styles.statsContainer}>
                  {/* Time */}
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>시간</Text>
                    <Text style={styles.statValue}>0:20:10</Text>
                  </View>

                  {/* Distance */}
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>거리</Text>
                    <Text style={styles.statValue}>81.45km</Text>
                  </View>

                  {/* Calories */}
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>칼로리</Text>
                    <Text style={styles.statValue}>2200kcal</Text>
                  </View>
                </View>
              </View>

              {/* Map Container */}
              <View style={styles.mapContainer}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729658603~exp=1729662203~hmac=c93172aa7d60615eabe095b7c6353c75adf2fb686c981abcbd21acded998134e&w=1800',
                  }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </View>
          </Card>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >{`${selected?.month ?? 1}월의 미션`}</Text>
          {data?.map((mission, index) => (
            <MissionItem
              key={`${mission}-${index}`}
              mission={mission.missionName}
              missionType={mission.missionType}
              missionProgressType={mission.missionProgressType as 'READY' | 'PROGRESS' | 'COMPLETE'}
              missionId={mission.missionId}
              percent={mission.percent}
            />
          )) ?? []}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  statItem: {
    gap: 6,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8F9BB3',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  mapContainer: {
    width: 150,
    height: 150,
    marginTop: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
