import { Bounce, toast } from 'react-toastify';

type TostType = 'info' | 'success' | 'warn' | 'error';

/*
type: "info" | "success" | "warn" | "error" 중 하나 넣기
text: 토스트에 보여질 문구
사용방법: setToast("warn", "🚨 경고 메세지 출력!")
*/
const setToast = (type: TostType, text: string): void => {
  toast.dismiss(); // 기존에 있던 토스트 제거(중복 x)
  toast[type](text, {
    position: 'bottom-center', // 위치
    autoClose: 3000, // 시간
    hideProgressBar: false, // 로딩 바
    closeOnClick: true, // 클릭 -> 닫기
    pauseOnHover: false, // 마우스 오버 시간 멈추기
    draggable: true, // 드래그로 닫기
    progress: undefined,
    theme: 'light',
    transition: Bounce, // 애니메이션
  });
};

export default setToast;
