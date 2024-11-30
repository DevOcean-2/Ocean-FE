import {
  ICON_GALLERY,
  ICON_PIN_GREEN,
  ICON_NAVIGATE,
  FIRST_SESSION,
  SECOND_SESSION,
  THIRD_SESSION,
} from '@/assets/svgs';
import { SvgProps } from 'react-native-svg';

interface OnboardingSlide {
  id: number;
  title: string;
  pageIndex: number;
  description: string;
  icon: React.FC<SvgProps>;
  image: React.FC<SvgProps>;
}

const onBoardingSlide: OnboardingSlide[] = [
  {
    id: 1,
    icon: ICON_NAVIGATE,
    pageIndex: 4,
    title: '홈으로 이동합니다',
    description: '반려견과 함께 산책하면서\n산책 경로에 숨어있는 미션을 완료해보세요',
    image: FIRST_SESSION,
  },
  {
    id: 2,
    icon: ICON_PIN_GREEN,
    pageIndex: 5,
    title: '장소 메뉴에서',
    description: '반려견과 함께 갈 수 있는\n나만의 장소 리스트를 만들어보세요',
    image: SECOND_SESSION,
  },
  {
    id: 3,
    icon: ICON_GALLERY,
    pageIndex: 6,
    title: '마이피드에서',
    description: '내 반려견이 가진 귀여움을\n다른 사람들에게도 자랑해보세요',
    image: THIRD_SESSION,
  },
];

export default onBoardingSlide;
