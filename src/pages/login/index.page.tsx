import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/Input';

interface IFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요.' })
    .email({ message: '이메일 형식으로 작성해 주세요.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해 주세요.' })
    .min(8, { message: '8자 이상 입력해주세요.' }),
  passwordConfirm: z.string().min(1),
});

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const onValid: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };
  const onInvalid: SubmitErrorHandler<IFormValues> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <div>
          <Input
            label="이메일"
            id="email"
            register={register}
            required
            placeholder="이메일을 입력해주세요."
            errors={errors}
          />
        </div>
        <div>
          <Input
            id="password"
            icon="calendar"
            register={register}
            required
            placeholder="비밀번호를 입력해주세요."
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <Input
            id="passwordConfirm"
            type="password"
            register={register}
            required
            placeholder="비밀번호를 입력해 주세요."
          />
          <p>{errors.passwordConfirm?.message}</p>
        </div>
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default Login;
