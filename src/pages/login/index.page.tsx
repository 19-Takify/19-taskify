import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import { instance as axios, isAxiosError } from '@/apis/axios';
import setToast from '@/utils/setToast';
import { useRouter } from 'next/router';

type IFormValues = {
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
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onValid: SubmitHandler<IFormValues> = async (data) => {
    try {
      const response = await axios.post('auth/login', data);
      const result = response.data;
      // console.log(result);
      router.push('/mydashboard');
    } catch (error) {
      if (isAxiosError(error)) {
        // `AxiosError`인 경우 에러 처리
        if (error.response) {
          setToast('error', error.response.data.message);
        } else {
          setToast('error', error.message);
        }
      } else {
        // `AxiosError`가 아닌 경우
        setToast('error', String(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <div>
          <Input
            label="이메일"
            hasLabel
            id="email"
            type="email"
            register={register('email')}
            placeholder="이메일을 입력해주세요."
            errors={errors}
          />
        </div>
        <div>
          <Input
            id="password"
            label="비밀번호"
            hasLabel={true}
            type="password"
            register={register('password')}
            placeholder="비밀번호를 입력해주세요."
            errors={errors}
          />
        </div>
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
