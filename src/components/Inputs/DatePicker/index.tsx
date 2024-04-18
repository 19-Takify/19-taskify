import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
import Image from 'next/image';
import styles from './DatePicker.module.scss';

type DatePickerProps<F extends FieldValues> = {
  control: Control<F>;
  name: Path<F>;
  id?: string;
  label: string;
  hasLabel: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

/**
 * @param control - react-hook-form의 useForm에서 받아온 control 값.
 * @param name - useForm의 schema field 값.
 * @param id - label의 htmlFor, input의 id.
 * @param label - label의 text 값.
 * @param hasLabel - label을 화면 상에서 보여줄지 결정하는 값. (웹 접근성 반영)
 * @param required - label에 * 표시와 input의 required.
 * @param placeholder - input의 placeholder.
 * @param className - input의 className에 커스텀 스타일링 할 때 넘겨주는 값.
 */
function DatePicker<F extends FieldValues>({
  control,
  name,
  id,
  label,
  hasLabel,
  required = false,
  placeholder,
  className,
}: DatePickerProps<F>) {
  registerLocale('ko', ko);

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${hasLabel || styles.hiddenLabel}`}
        htmlFor={id}
      >
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div className={`${styles.inputContainer} ${className}`}>
        <Image
          src="/svgs/calendar.svg"
          alt="calendarIcon"
          className={styles.calendarIcon}
          width={24}
          height={24}
        />
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
                className={styles.input}
                placeholderText={placeholder}
                selected={value}
                required={required}
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
