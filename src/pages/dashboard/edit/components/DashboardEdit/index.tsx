import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import styles from './Dashboard.module.scss';

const COLOR = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

// 추후에 전역 상태 데이터로 변경
const tempData = {
  title: '비브리지',
  color: '#7AC555',
};

function DashboardEdit() {
  const [value, setValue] = useState({
    title: tempData.title,
    color: tempData.color,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleColorClick = (color: string) => {
    setValue((prev) => ({
      ...prev,
      color,
    }));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>{tempData.title}</h2>
        <ul>
          {COLOR.map((v, idx) =>
            value.color === v ? (
              <li
                key={idx}
                style={{ backgroundColor: v }}
                onClick={() => handleColorClick(v)}
              >
                <Image
                  className={styles.check}
                  src="/svgs/check-white.svg"
                  alt="체크 모양 이미지"
                  width={24}
                  height={24}
                />
              </li>
            ) : (
              <li
                key={idx}
                style={{ backgroundColor: v }}
                onClick={() => handleColorClick(v)}
              />
            ),
          )}
        </ul>
      </div>
      <div className={styles.inputBox}>
        <label htmlFor="dashboardName">대시보드 이름</label>
        <input
          id="dashboardName"
          type="text"
          value={value.title}
          onChange={handleInputChange}
        />
      </div>
      <button>변경</button>
    </div>
  );
}

export default DashboardEdit;
