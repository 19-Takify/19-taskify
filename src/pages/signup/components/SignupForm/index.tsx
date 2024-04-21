import styles from './SignupForm.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/apis/axios';
import { isAxiosError } from 'axios';
import PageButton from '@/components/Button/PageButton';
import Input from '@/components/Inputs/Input';
import setToast from '@/utils/setToast';
import {
  FETCH_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  VALID_ERROR_MESSAGE,
} from '@/constants/errorMessage';

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
      .min(1, { message: VALID_ERROR_MESSAGE.EMAIL.EMPTY })
      .email({ message: VALID_ERROR_MESSAGE.EMAIL.INVALID }),
    nickname: z
      .string()
      .trim()
      .min(1, { message: VALID_ERROR_MESSAGE.NICKNAME.EMPTY })
      .max(10, { message: VALID_ERROR_MESSAGE.MAX.TEN }),
    password: z
      .string()
      .trim()
      .min(1, { message: VALID_ERROR_MESSAGE.PASSWORD.EMPTY })
      .min(8, { message: VALID_ERROR_MESSAGE.MIN.EIGHT }),
    passwordConfirm: z
      .string()
      .trim()
      .min(1, VALID_ERROR_MESSAGE.PASSWORD.EMPTY),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: VALID_ERROR_MESSAGE.PASSWORD.NOT_MATCH,
  });

function SignupForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleValidSubmit = async (data: FormValues) => {
    try {
      await axios.post('/users', data);
      setToast('success', '가입이 완료되었습니다.');
      router.push('/login');
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            setError('email', { message: SERVER_ERROR_MESSAGE.EMAIL.INVALID });
            return;
          case 409:
            setError('email', {
              message: SERVER_ERROR_MESSAGE.EMAIL.DUPLICATE,
            });
            return;
          default:
            setError('email', {
              message: SERVER_ERROR_MESSAGE.EMAIL.ALTERNATE,
            });
            return;
        }
      }
      setToast('warn', FETCH_ERROR_MESSAGE.UNKNOWN);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <Input
          id="email"
          type="email"
          register={register('email')}
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          hasLabel
          errors={errors}
        />

        <Input
          id="nickname"
          type="text"
          register={register('nickname')}
          label="닉네임"
          placeholder="닉네임을 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <Input
          id="password"
          type="password"
          register={register('password')}
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <Input
          id="passwordConfirm"
          type="password"
          register={register('passwordConfirm')}
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요."
          hasLabel
          errors={errors}
        />
      </div>
      <PageButton type="submit" disabled={!isValid || isSubmitting}>
        가입하기
      </PageButton>
    </form>
  );
}

export default SignupForm;
