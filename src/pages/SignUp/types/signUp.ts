import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['여자아이', '남자아이']),
  size: z.enum(['소형견', '중형견', '대형견']),
  breed: z.string().min(1, '품종을 선택해주세요'),
  careLevel: z.number().min(1).max(3),
});

export type FormData = z.infer<typeof schema>;

export type StepProps = {
  control: any;
  errors: any;
};
