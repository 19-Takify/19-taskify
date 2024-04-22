import Portal from './Potal';
import styles from './Modal.module.scss';
import Image from 'next/image';
import kebabIcon from '@/svgs/kebab.svg';
import closeIcon from '@/svgs/close.svg';
import example from '@/svgs/example.svg';
import ProfileIcon from '../Profile/ProfileIcon';

type ModalProps = {
  onClick: () => void;
  onClose: () => void;
};

function Modal({ onClick, onClose }: ModalProps) {
  return (
    <Portal>
      <div className={styles.background}>
        <div className={styles.modalBox}>
          <div className={styles.btnBox}>
            <div className={styles.name}>새로운 일정 관리 Taskify</div>
            <div className={styles.btns}>
              <button onClick={onClick} className={styles.btn}>
                <Image src={kebabIcon} alt="dropdown" width={28} height={28} />
              </button>
              <button onClick={onClose} className={styles.btn}>
                <Image src={closeIcon} alt="X" width={28} height={28} />
              </button>
            </div>
          </div>
          <div className={styles.contentBox}>
            <div>
              <div className={styles.content}>
                <div className={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                  Cras mattis, nulla non laoreet porttitor, diam justo laoreet
                  eros, vel aliquet diam elit at leo.
                </div>
                <Image src={example} alt="example" className={styles.img} />
                <div>댓글</div>
                <div className={styles.textarea}>
                  <textarea
                    placeholder="댓글 작성하기"
                    className={styles.input}
                  />
                  <button className={styles.submit}>입력</button>
                </div>
              </div>
              <div className={styles.comment}>
                <div className={styles.profile}>
                  <ProfileIcon />
                  <div className={styles.profileName}>정만철</div>
                  <div className={styles.createAt}>2022.12.27 14:00</div>
                </div>
                <div className={styles.commentBox}>
                  <div className={styles.commentText}>
                    오늘안에 ccc까지 만들 수 있을까요?
                  </div>
                  <div className={styles.commentBtns}>
                    <button className={styles.btn}>수정</button>
                    <button className={styles.btn}>삭제</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.managerBox}>
              <div className={styles.manager}>담당자</div>
              <div className={styles.managerProfile}>
                <ProfileIcon small />
                <div className={styles.managerName}>정만철</div>
              </div>
              <div className={styles.manager}>마감일</div>
              <div className={styles.managerName}>2022.12.30 19:00</div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
