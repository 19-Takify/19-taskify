import styles from './NewColumnModal.module.scss';
import Modal from '../Modal';
import Input from '@/components/Inputs/Input';
import HttpClient from '@/apis/httpClient';
import { z } from 'zod';
import { VALID_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalButton from '@/components/Button/ModalButton';
import setToast from '@/utils/setToast';

type NewColumnModalProps = {
  showModal: boolean;
  handleClose: () => void;
  dashboardId: number;
};

type FormValues = {
  title: string;
};

type ColumnType = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

type ColumnList = {
  result: string;
  data: ColumnType[];
};

const initialFormValues = {
  title: '',
};

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: VALID_ERROR_MESSAGE.COLUMN.EMPTY }),
});

function NewColumnModal({
  showModal,
  handleClose,
  dashboardId,
}: NewColumnModalProps) {
  const httpClient = new HttpClient();
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

      await httpClient.post('/columns', { ...data, dashboardId: dashboardId });
      setToast('success', '컬럼이 생성되었습니다.');

      handleResetClose();
    } catch {
      setToast('error', '컬럼 생성에 실패했습니다.');
    }
  };

  const handleValidColumn = async (data: FormValues) => {
    try {
      const columnList: ColumnList = await httpClient.get(
        `/columns?dashboardId=${dashboardId}`,
      );
      const isValid = !columnList.data.some(
        ({ title }) => title === data.title,
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
        <strong className={styles.modalTitle}>새 컬럼 생성</strong>
        <Input
          id="title"
          type="text"
          register={register('title')}
          label="이름"
          placeholder="컬럼 이름을 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <div className={styles.modalButton}>
          <ModalButton type="button" onClick={handleResetClose}>
            취소
          </ModalButton>
          <ModalButton type="submit" disabled={!isValid || isSubmitting}>
            생성
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
}

export default NewColumnModal;
