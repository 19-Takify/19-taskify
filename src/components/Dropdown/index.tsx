import Image from 'next/image';
import styles from './Dropdown.module.scss';
import { MouseEvent, useEffect, useState, useId } from 'react';
import DropDownItem from './DropDownItem';

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
  const [isSelectData, setIsSelectData] = useState<TIsSelect>({
    isClick: false,
    index: 99999,
    title: '',
    nickname: '',
    profileImageUrl: '',
  });
  const id = useId();

  const handleDropdownClick = (e: any) => {
    const target = e.target as HTMLElement;
    const datasetState = target.dataset.state;
    if (datasetState === `Dropdown${id}`) {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownClick);

    return () => {
      document.removeEventListener('click', handleDropdownClick);
    };
  }, []);

  const handleItemClick = (index: number, data: any) => {
    setIsSelectData({
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
        onClick={handleDropdownClick}
        data-state={`Dropdown${id}`}
      >
        {isSelectData.isClick ? (
          usage === 'state' ? (
            <DropDownItem usage={usage} data={isSelectData} />
          ) : (
            <DropDownItem usage={usage} data={isSelectData} />
          )
        ) : initialData ? (
          usage === 'state' ? (
            <DropDownItem usage={usage} data={initialData} />
          ) : (
            <DropDownItem usage={usage} data={initialData} />
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
