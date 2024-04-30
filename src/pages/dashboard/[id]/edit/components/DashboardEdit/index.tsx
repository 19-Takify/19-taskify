import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import styles from './Dashboard.module.scss';
import { useAtom } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import { TOAST_TEXT } from '@/constants/toastText';

const COLOR = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

function DashboardEdit() {
  const [selectDashboard, setSelectDashboard] = useAtom(selectDashboardAtom);
  const [value, setValue] = useState({
    title: selectDashboard.title,
    color: selectDashboard.color,
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

  const handleEditDashboard = async () => {
    try {
      const res = await axios.put(`/dashboards/${selectDashboard.id}`, value);
      setSelectDashboard((prev) => ({
        ...prev,
        title: value.title,
        color: value.color,
      }));
      setToast(TOAST_TEXT.success, '대시보드가 수정되었습니다.');
    } catch (e: any) {
      setToast(TOAST_TEXT.error, e.response.data.message);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>{selectDashboard.title}</h2>
        <ul>
          {COLOR.map((v, idx) => (
            <li
              key={idx}
              style={{ backgroundColor: v }}
              onClick={() => handleColorClick(v)}
            >
              {value.color === v && (
                <Image
                  className={styles.check}
                  src="/svgs/check-white.svg"
                  alt="체크 모양 이미지"
                  width={24}
                  height={24}
                />
              )}
            </li>
          ))}
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
      <button onClick={() => handleEditDashboard()}>변경</button>
    </div>
  );
}

export default DashboardEdit;
