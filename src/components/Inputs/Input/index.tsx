import styles from './Input.module.scss';
import { useState, InputHTMLAttributes } from 'react';
import Image from 'next/image';
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';
import eyeOnImg from '@/svgs/eye-on.svg';
import eyeOffImg from '@/svgs/eye-off.svg';
import searchIcon from '@/svgs/search.svg';
import calendarIcon from '@/svgs/calendar.svg';

type IconType = 'search';

const ICON_IMG = {
  search: {
    src: searchIcon,
    alt: 'searchIcon',
  },
};

type InputProps = {
  className?: string;
  type?: string;
  icon?: IconType;
  label?: string;
  id: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<FieldValues>;
} & InputHTMLAttributes<HTMLInputElement>;

/** 
/* @param className - Input 커스터마이징 (Input을 사용하는 곳에서 쓰는 className) ex) styles.dashboardName
/* @param type - email 또는 password
/* @param icon - 사용할 아이콘 이름 ex) search
/* @param label - 라벨 
/* @param id - 라벨의 id로 사용하고 싶은 값 ex) email
/* @param required - 라벨 옆에 *(필수 표시) 붙일 건지 안 붙일 건지 ex) true
/* @param register - useForm register 함수의 반환값 ex)register={register('password')}
/* @param errors - useForm을 사용할 때 설정해 준 errors ex)errors={errors}
*/
function Input({
  className,
  type = 'text',
  icon,
  label,
  id,
  required = false,
  register,
  errors,
  ...rest
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleToggler = () => {
    setIsVisible((preIsVisible) => !preIsVisible);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.inputContainer} ${errors && styles.error}`}>
        {icon && <Image src={ICON_IMG[icon]?.src} alt={ICON_IMG[icon]?.alt} />}
        <input
          type={type === 'password' && isVisible ? 'text' : type}
          className={`${styles.input} ${className}`}
          id={id}
          required={required}
          {...register}
          {...rest}
        />
        {type === 'password' && (
          <button onClick={handleVisibleToggler} type="button">
            <Image
              src={isVisible ? eyeOnImg : eyeOffImg}
              alt={isVisible ? 'eyeOnImg' : 'eyeOffImg'}
            />
          </button>
        )}
      </div>
      {errors && <p>{errors[register.name]?.message?.toString()}</p>}
    </div>
  );
}

export default Input;
