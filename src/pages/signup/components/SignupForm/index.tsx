import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './SignupForm.module.scss';
import PageButton from '@/components/Button/PageButton';
import Input from '@/components/Inputs/Input';

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const schema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: '이메일을 입력해 주세요.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
    nickname: z
      .string()
      .trim()
      .min(1, { message: '닉네임을 입력해 주세요.' })
      .max(10, { message: '열 자 이하로 작성해주세요.' }),
    password: z
      .string()
      .trim()
      .min(1, { message: '비밀번호를 입력해 주세요.' })
      .min(8, { message: '8자 이상 입력해주세요.' }),
    passwordConfirm: z.string().trim().min(1, '비밀번호를 입력해 주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

function SignupForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleValidSubmit = () => {};

  const handleInvalidSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <Input
          type="email"
          register={register('email')}
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          hasLabel={true}
          errors={errors}
        />
        <Input
          type="text"
          register={register('nickname')}
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          hasLabel={true}
          errors={errors}
        />
        <Input
          type="password"
          register={register('password')}
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요."
          hasLabel={true}
          errors={errors}
        />
        <Input
          type="password"
          register={register('passwordConfirm')}
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요."
          hasLabel={true}
          errors={errors}
        />
      </div>
      <PageButton disabled={!isValid}>가입하기</PageButton>
    </form>
  );
}

export default SignupForm;
