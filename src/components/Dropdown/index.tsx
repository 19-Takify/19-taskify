import Image from 'next/image';
import styles from './Dropdown.module.scss';
import { useEffect, useState, useId } from 'react';
import DropDownItem from './DropDownItem';
import { UseFormRegisterReturn } from 'react-hook-form';

type TData = {
  id?: number;
  title?: string;
  nickname?: string;
  profileImageUrl?: string;
};

type TIsSelect = {
  isClick: boolean;
} & TData;

type TDropdownProps = {
  usage: 'state' | 'manager';
  data: TData[];
  initialData?: TData;
  register: UseFormRegisterReturn;
};

function Dropdown({ usage, initialData, data, register }: TDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectData, setIsSelectData] = useState<TIsSelect>({
    isClick: false,
    id: 9999999,
    title: '',
    nickname: '',
    profileImageUrl: '',
  });
  const uniqueId = useId();

  useEffect(() => {
    document.addEventListener('click', handleDropdownClick);

    return () => {
      document.removeEventListener('click', handleDropdownClick);
    };
  }, []);

  const handleDropdownClick = (e: any): void => {
    const target = e.target as HTMLElement;
    const datasetState = target.dataset.state;
    if (datasetState === `Dropdown${uniqueId}`) {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(false);
  };

  const handleItemClick = (data: TData): void => {
    setIsSelectData({
      isClick: true,
      id: data.id,
      title: data.title,
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
    });
  };

  return (
    <>
      <div
        className={`${styles.initial} ${isOpen && styles.active}`}
        data-state={`Dropdown${uniqueId}`}
      >
        <input type="hidden" value={isSelectData.id} {...register} />
        {isSelectData.isClick ? (
          <DropDownItem usage={usage} data={isSelectData} />
        ) : initialData ? (
          <DropDownItem usage={usage} data={initialData} />
        ) : (
          '담당자를 선택해 주세요'
        )}
        {isOpen ? (
          <Image
            data-state={`Dropdown${uniqueId}`}
            src="/svgs/arrow-top.svg"
            width="26"
            height="26"
            alt="위를 가르키는 화살표 이미지"
            priority
          />
        ) : (
          <Image
            data-state={`Dropdown${uniqueId}`}
            src="/svgs/arrow-down.svg"
            width="26"
            height="26"
            alt="아래를 가르키는 화살표 이미지"
            priority
          />
        )}
        {isOpen && (
          <ul data-state={`Dropdown${uniqueId}`} className={styles.dropdown}>
            {data.map((value, idx) => (
              <li
                data-state={`Dropdown${uniqueId}`}
                key={value.id}
                className={styles.list}
                onClick={() => handleItemClick(value)}
              >
                {isSelectData.index === idx && (
                  <Image
                    className={`${styles.select} ${usage === 'manager' && styles.selectM}`}
                    src="/svgs/check.svg"
                    width="22"
                    height="22"
                    alt="체크 모양 이미지"
                  />
                )}
                <DropDownItem usage={usage} data={value} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Dropdown;
