import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import { VALID_ERROR_MESSAGE } from '@/constants/errorMessage';
import styles from './Password.module.scss';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import { TOAST_TEXT } from '@/constants/toastText';

const schema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: VALID_ERROR_MESSAGE.PASSWORD.EMPTY })
      .min(8, { message: VALID_ERROR_MESSAGE.MIN.EIGHT }),
    passwordConfirm: z
      .string()
      .trim()
      .min(1, VALID_ERROR_MESSAGE.PASSWORD.EMPTY),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: VALID_ERROR_MESSAGE.PASSWORD.EMPTY })
      .min(8, { message: VALID_ERROR_MESSAGE.MIN.EIGHT }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: VALID_ERROR_MESSAGE.PASSWORD.NOT_MATCH,
  });

type FormValues = {
  password: string;
  passwordConfirm: string;
  newPassword: string;
};

function PasswordChange() {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      const userInput = {
        password: data.password,
        newPassword: data.newPassword,
      };
      const res = await axios.put('auth/password', userInput);
      reset();
      setToast(TOAST_TEXT.success, '비밀번호가 변경되었습니다.');
    } catch (e: any) {
      console.error(e.response.data.message);
      setError('newPassword', { message: e.response.data.message });
    }
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.inputBox}>
          <Input
            type="password"
            label="현재 비밀번호"
            hasLabel
            register={register('password')}
            errors={errors}
          />
          <Input
            type="password"
            label="새 비밀번호"
            hasLabel
            register={register('passwordConfirm')}
            errors={errors}
          />
          <Input
            type="password"
            label="새 비밀번호 확인"
            hasLabel
            register={register('newPassword')}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={!isValid || isSubmitting}
        >
          저장
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
