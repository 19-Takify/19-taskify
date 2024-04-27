import styles from './NewDashboardModal.module.scss';
import Modal from '../Modal';
import Input from '@/components/Inputs/Input';
import HttpClient from '@/apis/httpClient';
import { z } from 'zod';
import { VALID_ERROR_MESSAGE } from '@/constants/errorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalButton from '@/components/Button/ModalButton';
import setToast from '@/utils/setToast';
import { DASHBOARD_COLORS } from '@/constants/colors';

type NewDashboardModalProps = {
  showModal: boolean;
  handleClose: () => void;
};

type FormValues = {
  title: string;
  color: string;
};

const initialFormValues = {
  title: '',
  color: DASHBOARD_COLORS[0],
};

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: VALID_ERROR_MESSAGE.DASHBOARD.EMPTY }),
  color: z.string().trim().min(1),
});

function NewDashboardModal({ showModal, handleClose }: NewDashboardModalProps) {
  const httpClient = new HttpClient();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      ...initialFormValues,
    },
  });

  const handleNewDashboard = async (data: FormValues) => {
    try {
      await httpClient.post('/dashboards', data);
      setToast('success', '대시보드가 생성되었습니다.');
      handleResetClose();
    } catch {
      setToast('error', '대시보드 생성에 실패했습니다.');
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
        onSubmit={handleSubmit(handleNewDashboard)}
      >
        <strong className={styles.modalTitle}>새로운 대시보드</strong>
        <Input
          id="title"
          type="text"
          register={register('title')}
          label="대시보드 이름"
          placeholder="대시보드 이름을 입력해 주세요."
          hasLabel
          errors={errors}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          {DASHBOARD_COLORS?.map((color) => (
            <input
              className={styles.circle}
              key={color}
              type="radio"
              value={color}
              {...register('color')}
              style={{ backgroundColor: `${color}` }}
            />
          ))}
        </div>
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

export default NewDashboardModal;
