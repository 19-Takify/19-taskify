import styles from './LoginForm.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import { isAxiosError } from 'axios';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import { useRouter } from 'next/router';
import PageButton from '@/components/Button/PageButton';
import {
  FETCH_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  VALID_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import { PAGE_PATH } from '@/constants/pageUrl';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: VALID_ERROR_MESSAGE.EMAIL.EMPTY })
    .email({ message: VALID_ERROR_MESSAGE.EMAIL.INVALID }),
  password: z
    .string()
    .min(1, { message: VALID_ERROR_MESSAGE.PASSWORD.EMPTY })
    .min(8, { message: VALID_ERROR_MESSAGE.MIN.EIGHT }),
});

function LoginForm() {
  // const [auth, setAuth] = useAuth(false);
  // console.log(auth);
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post('auth/login', data);
      const result = response.data;
      document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${result?.accessToken}`;
      // router.push(PAGE_PATH.MY_DASHBOARD);
    } catch (error) {
      if (!isAxiosError(error)) {
        // `AxiosError`가 아닌 경우
        setToast('error', FETCH_ERROR_MESSAGE.UNKNOWN);
        return;
      }
      // `AxiosError`인 경우 에러 처리
      if (!error.response) {
        setToast('error', FETCH_ERROR_MESSAGE.REQUEST);
        return;
      }
      const status = error.response?.status;
      switch (status) {
        case 400:
          setError('password', {
            message: SERVER_ERROR_MESSAGE.PASSWORD.NOT_MATCH,
          });
          return;
        case 404:
          setError('email', { message: SERVER_ERROR_MESSAGE.USER.NOT_FOUND });
          return;
      }
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <div className={styles.inputContainer}>
        <Input
          label="이메일"
          hasLabel
          id="email"
          type="email"
          register={register('email')}
          placeholder="이메일을 입력해 주세요."
          errors={errors}
          autoComplete="email"
        />

        <Input
          id="password"
          label="비밀번호"
          hasLabel
          type="password"
          register={register('password')}
          placeholder="비밀번호를 입력해 주세요."
          errors={errors}
          autoComplete="password"
        />
      </div>
      <PageButton type="submit" disabled={!isValid || isSubmitting}>
        로그인
      </PageButton>
    </form>
  );
}

export default LoginForm;
