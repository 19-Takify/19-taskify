import styles from './InviteDashboard.module.scss';
import Modal from '../Modal';
import Input from '@/components/Inputs/Input';
import HttpClient from '@/apis/httpClient';
import { z } from 'zod';
import { VALID_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalButton from '@/components/Button/ModalButton';
import setToast from '@/utils/setToast';
import { isAxiosError } from 'axios';

type InviteDashboardModalProps = {
  showModal: boolean;
  handleClose: () => void;
  dashboardId: number;
  syncFunc?: any;
};

type FormValues = {
  email: string;
};

const initialFormValues = {
  email: '',
};

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: VALID_ERROR_MESSAGE.EMAIL.EMPTY })
    .email({ message: VALID_ERROR_MESSAGE.EMAIL.INVALID }),
});

function InviteDashBoardModal({
  showModal,
  handleClose,
  dashboardId,
  syncFunc,
}: InviteDashboardModalProps) {
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

  const handleInviteDashboard = async (data: FormValues) => {
    try {
      await httpClient.post(`/dashboards/${dashboardId}/invitations`, data);
      setToast('success', '대시보드 초대에 성공했습니다.');

      handleResetClose();
      if (syncFunc) {
        syncFunc();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message || '대시보드 초대에 실패했습니다.';

        status === 400
          ? setError('email', { message })
          : setToast('error', message);
      }
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
        onSubmit={handleSubmit(handleInviteDashboard)}
      >
        <strong className={styles.modalTitle}>초대하기</strong>
        <Input
          id="title"
          type="email"
          register={register('email')}
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <div className={styles.modalButton}>
          <ModalButton type="button" onClick={handleResetClose}>
            취소
          </ModalButton>
          <ModalButton type="submit" disabled={!isValid || isSubmitting}>
            초대
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
}

export default InviteDashBoardModal;
