import { z } from 'zod';

const DogGender = {
  MALE: 0,
  FEMALE: 1,
} as const;

const DogSize = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
} as const;

export const schema = z.object({
  dog_name: z.string().min(1, '이름을 입력해주세요'),
  dog_gender: z.nativeEnum(DogGender),
  dog_size: z.nativeEnum(DogSize),
  breed: z.string().min(1, '품종을 선택해주세요'),
  careLevel: z.number().min(1).max(3),
});

export type FormData = z.infer<typeof schema>;

export type StepProps = {
  control: any;
  errors: any;
};
