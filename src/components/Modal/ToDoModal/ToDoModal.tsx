import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalDropdown from '../ModalDropdown/ModalDropdown';
import Modal from '../Modal/Modal';

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
};

function ToDoModal({ showModal, handleClose }: ModalProps) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className={styles.btnBox}>
        <div className={styles.btns}>
          <button onClick={handleDropdownOpen} className={styles.btnx}>
            <Image
              src="/svgs/kebab.svg"
              alt="케밥 버튼"
              width={28}
              height={28}
            />
          </button>
          {isDropdown && (
            <ModalDropdown
              showDropdown={isDropdown}
              handleDropdownClose={handleDropdownClose}
            />
          )}
          <button onClick={handleClose} className={styles.btnx}>
            <Image src="/svgs/close.svg" alt="닫기" width={28} height={28} />
          </button>
        </div>
        <div className={styles.name}>새로운 일정 관리 Taskify</div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.managerBox}>
          <div className={styles.nameBox}>
            <div className={styles.manager}>담당자</div>
            <div className={styles.managerProfile}>
              <ProfileIcon small />
              <div className={styles.managerName}>정만철</div>
            </div>
          </div>
          <div>
            <div className={`${styles.manager} ${styles.doneDate}`}>마감일</div>
            <div className={styles.managerName}>2022.12.30 19:00</div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
              Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros,
              vel aliquet diam elit at leo.
            </div>
            <div className={styles.img}>
              <Image
                src="/svgs/example.svg"
                alt="예시 사진"
                layout="responsive"
                width={300}
                height={300}
              />
            </div>
            <div>댓글</div>
            <div className={styles.textarea}>
              <textarea placeholder="댓글 작성하기" className={styles.input} />
              <button className={styles.submit}>입력</button>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.profile}>
              <ProfileIcon small />
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
      </div>
    </Modal>
  );
}

export default ToDoModal;
