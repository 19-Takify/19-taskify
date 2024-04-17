import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import calendarIcon from '@/svgs/calendar.svg';
import Image from 'next/image';
import styles from './DatePicker.module.scss';

type DatePickerProps<F extends FieldValues> = {
  control: Control<F>;
  name: Path<F>;
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

function DatePicker<F extends FieldValues>({
  control,
  name,
  id,
  label,
  placeholder,
  className,
}: DatePickerProps<F>) {
  registerLocale('ko', ko);

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        <Image src={calendarIcon} alt={'calendarIcon'} />
        <Controller
          control={control}
          name={name}
          render={({ field: { value, ...fieldProps } }) => {
            return (
              <ReactDatePicker
                {...fieldProps}
                id={id}
                locale="ko"
                dateFormat="yyyy.MM.dd HH:mm"
                className={`${styles.input} ${className || ''}`}
                placeholderText={placeholder}
                selected={value}
                showTimeSelect
              />
            );
          }}
        />
      </div>
    </div>
  );
}

export default DatePicker;
