import styles from './Input.module.scss';
import { useState, InputHTMLAttributes } from 'react';
import Image from 'next/image';
import { Path, UseFormRegister } from 'react-hook-form';
import eyeOnImg from '@/svgs/eye-on.svg';
import eyeOffImg from '@/svgs/eye-off.svg';
import searchIcon from '@/svgs/search.svg';
import calendarIcon from '@/svgs/calendar.svg';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const iconImg = {
  search: searchIcon,
  calendar: calendarIcon,
};

type IconType = 'calendar' | 'search';

type InputProps = {
  className?: string;
  type?: string;
  icon?: IconType;
  label?: string;
  id: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  required: boolean;
  errors?: any;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({
  className,
  type = 'text',
  icon,
  label,
  id,
  register,
  required,
  errors,
  ...rest
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleVisibleToggler = () => {
    setIsVisible((preIsVisible) => !preIsVisible);
    if (inputType === 'text') {
      setInputType('password');
      return;
    }
    if (inputType === 'password') {
      setInputType('text');
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && <Image src={iconImg[icon]} alt={icon} />}
        <input
          type={inputType}
          className={styles.input}
          id={id}
          {...register(id)}
          {...rest}
        />
        {type === 'password' && (
          <button onClick={handleVisibleToggler} type="button">
            <Image src={isVisible ? eyeOnImg : eyeOffImg} alt="eyeOnImage" />
          </button>
        )}
      </div>
      {errors && <p>{errors[id]?.message}</p>}
    </div>
  );
}

export default Input;
