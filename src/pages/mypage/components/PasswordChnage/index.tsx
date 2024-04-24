import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/apis/axios';
import { isAxiosError } from 'axios';
import Input from '@/components/Inputs/Input';
import {
  FETCH_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  VALID_ERROR_MESSAGE,
} from '@/constants/errorMessage';
import styles from './Password.module.scss';

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
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const handleFormSubmit = async (data: FormValues) => {
    console.log(data);
    // auth/password, POST, (data.password, data.newPassword) 넘겨주기
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
        <button type="submit" className={styles.button}>
          저장
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
