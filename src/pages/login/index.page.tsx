import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import DatePicker from '@/components/Inputs/DatePicker';
import Meta from '@/components/Meta';

type IFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  ReactDatepicker: Date;
};

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해 주세요.' })
      .email({ message: '이메일 형식으로 작성해 주세요.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해 주세요.' })
      .min(8, { message: '8자 이상 입력해주세요.' }),
    passwordConfirm: z.string().min(1, '비밀번호를 입력해 주세요.'),
    ReactDatepicker: z.date(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      ReactDatepicker: new Date(),
    },
  });
  const onValid: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };
  const onInvalid: SubmitErrorHandler<IFormValues> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Meta title="Taskify | 로그인" />
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div>
          <div>
            <Input
              label="이메일"
              hasLabel
              required
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
              icon={{
                src: '/svgs/search.svg',
                alt: 'search 아이콘',
                width: 24,
                height: 24,
              }}
              type="password"
              required
              register={register('password')}
              placeholder="비밀번호를 입력해주세요."
            />
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <Input
              id="passwordConfirm"
              type="password"
              label="비밀번호 확인"
              hasLabel={false}
              register={register('passwordConfirm')}
              placeholder="비밀번호를 입력해 주세요."
            />
            <p>{errors.passwordConfirm?.message}</p>
          </div>
        </div>
        <DatePicker
          control={control}
          name="ReactDatepicker"
          label="마감일"
          hasLabel={true}
          required
        />
      </form>
    </>
  );
}

export default Login;
