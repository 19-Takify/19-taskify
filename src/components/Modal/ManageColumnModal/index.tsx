import styles from './ManageColumnModal.module.scss';
import Modal from '../Modal';
import Input from '@/components/Inputs/Input';
import HttpClient from '@/apis/httpClient';
import { z } from 'zod';
import { VALID_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalButton from '@/components/Button/ModalButton';
import setToast from '@/utils/setToast';

type ManageColumnModalProps = {
  showModal: boolean;
  handleClose: () => void;
  columnData: ColumnType;
};

type FormValues = {
  title: string;
};

type ColumnType = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

type ColumnList = {
  result: string;
  data: ColumnType[];
};

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: VALID_ERROR_MESSAGE.DASHBOARD.EMPTY }),
});

function ManageColumnModal({
  showModal,
  handleClose,
  columnData,
}: ManageColumnModalProps) {
  const httpClient = new HttpClient();
  const initialFormValues = {
    title: columnData.title,
  };
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      ...initialFormValues,
    },
  });

  const handleColumnUpdate = async (data: FormValues) => {
    try {
      const isValid = await handleValidColumn(data);
      if (!isValid) {
        setError('title', { message: '중복된 컬럼 입니다.' });
        return;
      }

      await httpClient.put(`/columns/${columnData.id}`, {
        ...data,
      });
      setToast('success', '컬럼 이름이 변경되었습니다.');

      handleResetClose();
    } catch {
      setToast('error', '컬럼 이름 변경에 실패했습니다.');
    }
  };

  const handleColumnDelete = async () => {
    try {
      await httpClient.delete(`/columns/${columnData.id}`);
      setToast('success', '컬럼 삭제에 성공되었습니다.');
      handleResetClose();
    } catch {
      setToast('error', '컬럼 삭제에 실패했습니다.');
    }
  };

  const handleValidColumn = async (data: FormValues) => {
    try {
      const columnList: ColumnList = await httpClient.get(
        `/columns?dashboardId=${columnData.dashboardId}`,
      );
      const isValid = !columnList.data.some(
        ({ id, title }) => id !== columnData.id && title === data.title,
      );
      return isValid;
    } catch {
      setToast('error', '컬럼 조회에 실패했습니다.');
    }
  };

  const handleResetClose = () => {
    reset();
    handleClose();
  };

  return (
    <Modal showModal={showModal} handleClose={handleResetClose}>
      <form
        className={styles.modalForm}
        onSubmit={handleSubmit(handleColumnUpdate)}
      >
        <strong className={styles.modalTitle}>컬럼 관리</strong>
        <Input
          id="title"
          type="text"
          register={register('title')}
          label="이름"
          placeholder="컬럼 이름을 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <div className={styles.buttonBox}>
          <button
            type="button"
            className={styles.columnDelete}
            onClick={handleColumnDelete}
          >
            삭제하기
          </button>
          <div className={styles.modalButton}>
            <ModalButton type="button" onClick={handleResetClose}>
              취소
            </ModalButton>
            <ModalButton type="submit" disabled={!isValid || isSubmitting}>
              변경
            </ModalButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ManageColumnModal;
