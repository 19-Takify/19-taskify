import setToast from '@/utils/setToast';
import { ToastText } from '@/constants/toastText';

export default function Home() {
  return (
    <>
      <button onClick={() => setToast(ToastText.success, 'ㅇ_ㅇ!')}>
        success
      </button>
      <button onClick={() => setToast(ToastText.error, 'ㅇ_ㅇ!')}>error</button>
      <button onClick={() => setToast(ToastText.info, 'ㅇ_ㅇ!')}>info</button>
      <button onClick={() => setToast(ToastText.warn, 'ㅇ_ㅇ!')}>warn</button>
    </>
  );
}
