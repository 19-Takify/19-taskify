import styles from './Input.module.scss';
import {
  useState,
  InputHTMLAttributes,
  Dispatch,
  MutableRefObject,
  RefObject,
} from 'react';
import Image from 'next/image';
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';
import eyeOnImg from '@/svgs/eye-on.svg';
import eyeOffImg from '@/svgs/eye-off.svg';
import ColorPicker from '@/components/ColorPicker';
import { SetStateAction } from 'jotai';

type IconType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type InputProps = {
  className?: string;
  type: string;
  icon?: IconType;
  label: string;
  hasLabel: boolean;
  id?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<FieldValues>;
  tag?: boolean;
  selectedColor?: string;
  setSelectedColor?: Dispatch<SetStateAction<string>>;
} & InputHTMLAttributes<HTMLInputElement>;

/** 
/* @param className - Input 커스터마이징 (Input을 사용하는 곳에서 쓰는 className) ex) styles.dashboardName
/* @param type - email 또는 password
/* @param icon - 사용할 아이콘 이름 ex) search
/* @param label - 라벨 이름
/* @param hasLabel -라벨을 사용할 건지 안 할 건지 (웹 접근성 반영)
/* @param id - 라벨의 id로 사용하고 싶은 값 ex) email
/* @param required - 라벨 옆에 *(필수 표시) 붙일 건지 안 붙일 건지 ex) true
/* @param register - useForm register 함수의 반환값 ex)register={register('password')}
/* @param errors - useForm을 사용할 때 설정해 준 errors ex)errors={errors}
/* @param tag -태그 인풋인지 아닌지 ex)false
*/
function Input({
  className,
  type,
  icon,
  label,
  hasLabel = false,
  id,
  required = false,
  register,
  errors,
  tag = false,
  selectedColor,
  setSelectedColor,
  ...rest
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleToggle = () => {
    setIsVisible((preIsVisible) => !preIsVisible);
  };

  const hasErrorMessage = errors && errors[register.name]?.message;

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${hasLabel || styles.hiddenLabel}`}
        htmlFor={id}
      >
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div
        className={`${styles.inputContainer} ${errors && errors[register.name] && styles.error} ${className}`}
      >
        {icon && (
          <Image
            width={icon.width}
            height={icon.height}
            src={icon.src}
            alt={icon.alt}
          />
        )}
        {tag && selectedColor && setSelectedColor && (
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}
        <input
          type={type === 'password' && isVisible ? 'text' : type}
          className={styles.input}
          id={id}
          required={required}
          {...register}
          {...rest}
        />
        {type === 'password' && (
          <button
            onClick={handleVisibleToggle}
            type="button"
            className={styles.visibleToggler}
          >
            <Image
              width={24}
              height={24}
              src={isVisible ? eyeOnImg : eyeOffImg}
              alt={isVisible ? 'Show Password' : 'Hide Password'}
            />
          </button>
        )}
      </div>
      {hasErrorMessage && (
        <p className={styles.errorMessage}>
          {errors[register.name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default Input;
