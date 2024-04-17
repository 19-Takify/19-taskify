import Image from 'next/image';
import styles from './Dropdown.module.scss';
import { MouseEvent, useEffect, useState, useId } from 'react';
import Item from './Item';

type TData = {
  title?: string;
  nickname?: string;
  profileImageUrl?: string;
};

type TIsSelect = {
  isClick: boolean;
  index: number;
} & TData;

type TDropdownProps = {
  usage: 'state' | 'manager';
  data: TData[];
  initialData?: TData;
};

function Dropdown({ usage, initialData, data }: TDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState<TIsSelect>({
    isClick: false,
    index: 99999,
    title: '',
    nickname: '',
    profileImageUrl: '',
  });
  const id = useId();

  useEffect(() => {
    document.addEventListener('click', (e) => handleDropdownClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleDropdownClick(e));
    };
  }, []);

  const handleDropdownClick = (e: any) => {
    if (e.target.dataset.state === `Dropdown${id}`) {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(false);
  };

  const handleItemClick = (index: number, data: any) => {
    setIsSelect({
      isClick: true,
      index,
      title: data.title,
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
    });
  };

  return (
    <>
      <div
        className={`${styles.initial} ${isOpen && styles.active}`}
        onClick={(e) => handleDropdownClick(e)}
        data-state={`Dropdown${id}`}
      >
        {isSelect.isClick ? (
          usage === 'state' ? (
            <Item usage={usage} data={isSelect} />
          ) : (
            <Item usage={usage} data={isSelect} />
          )
        ) : initialData ? (
          usage === 'state' ? (
            <Item usage={usage} data={initialData} />
          ) : (
            <Item usage={usage} data={initialData} />
          )
        ) : (
          '담당자를 선택해 주세요'
        )}
        {isOpen ? (
          <Image
            data-state={`Dropdown${id}`}
            src="/svgs/arrow-top.svg"
            width="26"
            height="26"
            alt="위를 가르키는 화살표 이미지"
          />
        ) : (
          <Image
            data-state={`Dropdown${id}`}
            src="/svgs/arrow-down.svg"
            width="26"
            height="26"
            alt="아래를 가르키는 화살표 이미지"
          />
        )}
        {isOpen && (
          <ul data-state={`Dropdown${id}`} className={styles.dropdown}>
            {data.map((value, idx) => (
              <li
                data-state={`Dropdown${id}`}
                key={idx}
                className={styles.list}
                onClick={() => handleItemClick(idx, value)}
              >
                {isSelect.index === idx && (
                  <Image
                    className={`${styles.select} ${usage === 'manager' && styles.selectM}`}
                    src="/svgs/check.svg"
                    width="22"
                    height="22"
                    alt="체크 모양 이미지"
                  />
                )}
                <Item usage={usage} data={value} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Dropdown;
