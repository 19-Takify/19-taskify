import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import { isAxiosError } from 'axios';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import { useRouter } from 'next/router';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요.' })
    .email({ message: '이메일 형식으로 작성해 주세요.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해 주세요.' })
    .min(8, { message: '8자 이상 입력해주세요.' }),
});

function Login() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
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
      console.log(result?.accessToken);
      document.cookie = `accessToken=${result?.accessToken}`;
      router.push('/');
    } catch (error) {
      if (!isAxiosError(error)) {
        // `AxiosError`가 아닌 경우
        setToast('error', '알 수 없는 오류가 발생했습니다.');
        return;
      }
      // `AxiosError`인 경우 에러 처리
      if (!error.response) {
        setToast('error', '로그인에 실패했습니다.');
        return;
      }
      const message = error.response.data.message;
      if (message === '존재하지 않는 유저입니다.') {
        setError('email', { message });
        return;
      }
      setError('password', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <div>
        <div>
          <Input
            label="이메일"
            hasLabel
            id="email"
            type="email"
            register={register('email')}
            placeholder="이메일을 입력해 주세요."
            errors={errors}
          />
        </div>
        <div>
          <Input
            id="password"
            label="비밀번호"
            hasLabel
            type="password"
            register={register('password')}
            placeholder="비밀번호를 입력해 주세요."
            errors={errors}
          />
        </div>
      </div>
      <button disabled={!isValid} type="submit">
        로그인
      </button>
    </form>
  );
}

export default Login;
