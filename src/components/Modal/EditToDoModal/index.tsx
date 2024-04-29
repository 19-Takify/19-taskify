import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton';
import Dropdown from '@/components/Dropdown';
import { FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import Input from '@/components/Inputs/Input';
import DatePicker from '@/components/Inputs/DatePicker';
import axios from '@/apis/axios';
import Tag from '@/components/Tag';
import styles from './EditToDoModal.module.scss';
import { formatDate } from '@/utils/dateCalculator';
import { SetStateAction } from 'jotai';
import Image from 'next/image';
import pen from '@/svgs/pen.svg';
import add from '@/svgs/add.svg';
import useFilePreview from '@/hooks/useFilePreview';
import setToast from '@/utils/setToast';
import { isAxiosError } from 'axios';
import { FETCH_ERROR_MESSAGE } from '@/constants/errorMessage';
import { TAG_COLORS } from '@/constants/colors';
import { getBytes } from '@/utils/stringUtils';

type Assignee = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};
type CardList = {
  id: number;
  title: string;
  description?: string;
  tags: string[];
  dueDate?: string;
  assignee?: Assignee;
  imageUrl?: string | null;
  teamId?: string;
  columnId: number;
  createdAt?: string;
  updatedAt?: string;
};

type ModalProps = {
  showEditModal: boolean;
  handleClose: () => void;
  cardContent: CardList;
  dashBoardId: number;
  purpose: string;
  resetDashboardPage: () => void;
};

type FormValues = {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: Date;
  tags: string[];
  uploadedFile: FileList;
  imageUrl: string | null;
  dashboardId: number;
};

type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: true;
};

type Column = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

function EditToDoModal({
  showEditModal,
  handleClose,
  cardContent,
  dashBoardId,
  purpose,
  resetDashboardPage,
}: ModalProps) {
  const schema = z.object({
    columnId: z.any(),
    assigneeUserId: z.any(),
    title: z.string().min(1, { message: '제목은 필수입니다.' }),
    description: z.string().min(1, { message: '설명은 필수입니다.' }),
    dueDate: z.date(),
    tags: z
      .string()
      .trim()
      .refine((val) => getBytes(val) < 30, {
        message: '30Bytes 이하로 입력해 주세요.',
      }),
    imageUrl: z.any(),
    uploadedFile: z.any(),
    dashBoardId: z.any(),
  });

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    setError,
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      title: cardContent?.title,
      description: cardContent?.description,
      dueDate: cardContent?.dueDate
        ? new Date(cardContent?.dueDate)
        : new Date(),
    },
  });

  const [selectedColor, setSelectedColor] = useState(
    TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
  );
  const [tagNameList, setTagNameList] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  let title;
  const divison = '!@#$%^&*';
  if (purpose === 'edit') {
    title = '할 일 수정';
  }
  if (purpose === 'create') {
    title = '할 일 생성';
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const tagName = (e.target as HTMLInputElement).value?.trim();

    if (tagNameList.length >= 5) {
      setError('tags', { message: '태그는 5개를 넘을 수 없습니다.' });
      e.currentTarget.value = '';
      return;
    }

    const bytes = getBytes(tagName);

    if (bytes < 1) {
      setError('tags', { message: '태그 이름을 입력해 주세요.' });
      return;
    }
    if (bytes > 30) return;
    const mergedTag = `${tagName}${divison}${selectedColor}`;

    const isDuplicate = tagNameList.some((tag) => tag === mergedTag);

    if (isDuplicate) {
      setError('tags', { message: '이미 등록된 태그입니다.' });
      return;
    }
    setTagNameList((prevList) => [...prevList, mergedTag]);
    (e.target as HTMLInputElement).value = '';
  };
  const handleTagNameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagName = (e.target as HTMLButtonElement).textContent || '';
    const color = e.currentTarget.dataset.color;
    const mergedTag = `${tagName}${divison}${color}`;
    setTagNameList((prevList) => prevList.filter((tag) => tag !== mergedTag));
  };
  //태그네임이 중복됐을 때?
  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await axios.get(`/members?dashboardId=${dashBoardId}`);
        setMembers(response.data.members);
      } catch (error) {
        if (!isAxiosError(error)) {
          // `AxiosError`가 아닌 경우
          setToast('error', FETCH_ERROR_MESSAGE.UNKNOWN);
          return;
        }
        // `AxiosError`인 경우 에러 처리
        if (!error.response) {
          setToast('error', FETCH_ERROR_MESSAGE.REQUEST);
          return;
        }
        const status = error.response?.status;
        switch (status) {
          case 404:
            setToast('error', '대시보드의 멤버가 아닙니다.');
            return;
        }
      }
    };
    const getColumns = async () => {
      try {
        const response = await axios.get(`/columns?dashboardId=${dashBoardId}`);
        setColumns(response.data.data);
      } catch (error) {
        if (!isAxiosError(error)) {
          // `AxiosError`가 아닌 경우
          setToast('error', FETCH_ERROR_MESSAGE.UNKNOWN);
          return;
        }
        // `AxiosError`인 경우 에러 처리
        if (!error.response) {
          setToast('error', FETCH_ERROR_MESSAGE.REQUEST);
          return;
        }
        const status = error.response?.status;
        switch (status) {
          case 404:
            setToast('error', '대시보드가 존재하지 않습니다.');
            return;
        }
      }
    };

    getMembers();
    getColumns();
  }, []);
  const [assignee, setAssignee] = useState<Member | undefined>();
  const [currentState, setCurrentState] = useState<Column | undefined>();
  useEffect(() => {
    const assignee = members.find(
      (el) => el.userId === cardContent?.assignee?.id,
    );
    setAssignee(assignee);
    const state = columns.find((el) => el.id === cardContent?.columnId);
    setCurrentState(state);
    setTagNameList(cardContent?.tags);
  }, [members, cardContent, columns]);

  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // data.assigneeUserId = 3079;
      // data.columnId = 22433;
      const timestamp = new Date(data.dueDate).getTime();
      const date = formatDate(timestamp);
      // data.imageUrl = data.imageUrl[0];
      if (data.uploadedFile !== null && data.uploadedFile.length !== 0) {
        const imageFile = data.uploadedFile[0];
        const imgdata = new FormData();
        imgdata.append('image', imageFile);
        const responseb = await axios.post(
          `/columns/22433/card-image`,
          imgdata,
        );
        const resultb = responseb.data;
        data.imageUrl = resultb.imageUrl;
      } else {
        data.imageUrl = null;
      }
      data.tags = tagNameList;
      data.dashboardId = dashBoardId;
      if (purpose === 'edit') {
        await axios.put(`/cards/${cardContent?.id}`, {
          ...data,
          dueDate: date,
        });
        handleClose();
        resetDashboardPage();
      }
      if (purpose === 'create') {
        await axios.post('/cards', data);
        handleClose();
        resetDashboardPage();
      }
    } catch (error) {
      if (!isAxiosError(error)) {
        // `AxiosError`가 아닌 경우
        setToast('error', FETCH_ERROR_MESSAGE.UNKNOWN);
        return;
      }
      // `AxiosError`인 경우 에러 처리
      if (!error.response) {
        setToast('error', FETCH_ERROR_MESSAGE.REQUEST);
        return;
      }
      const status = error.response?.status;
      switch (status) {
        case 400:
          setToast('error', '데이터가 형식에 맞지 않습니다.');
          return;
        case 404:
          setToast('error', '카드 정보가 유효하지 않습니다.');
          return;
      }
    }
  };
  const hasErrorMessage = errors && errors['description']?.message;

  const watchedUploadedFile = useWatch({
    name: 'uploadedFile',
    control,
  });
  const { imgSrc: filePreview, setImgSrc: setFilePreview } = useFilePreview(
    watchedUploadedFile,
    cardContent.imageUrl,
  );

  const handleImageFileDelete = () => {
    setValue('imageUrl', '');
    setFilePreview('');
  };

  return (
    <Modal
      className={styles.editToDoModal}
      showModal={showEditModal}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(handleValidSubmit)} className={styles.form}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.dropdowns}>
          <div className={styles.dropdown}>
            <label className={styles.label}>상태</label>
            <Dropdown
              usage="state"
              data={columns}
              initialData={{ title: currentState?.title, id: currentState?.id }}
              register={register('columnId')}
              setValue={setValue}
            />
          </div>
          <div className={styles.dropdown}>
            <label className={styles.label}>담당자</label>
            <Dropdown
              usage="manager"
              data={members}
              initialData={{
                nickname: assignee?.nickname,
                profileImageUrl: assignee?.profileImageUrl || undefined,
                id: assignee?.userId,
              }}
              register={register('assigneeUserId')}
              setValue={setValue}
            />
          </div>
        </div>
        <Input
          type="text"
          label="제목"
          hasLabel
          required
          register={register('title')}
          errors={errors}
        />
        <div className={styles.description}>
          <div className={styles.requiredLabel}>
            <label className={styles.label} htmlFor="description">
              설명
            </label>
            <span className={styles.required}>*</span>
          </div>
          <textarea
            className={`${styles.textarea} ${errors['description'] ? styles.error : ''}`}
            id="description"
            {...register('description')}
          />
          {hasErrorMessage && (
            <p className={styles.errorMessage}>
              {errors['description']?.message?.toString()}
            </p>
          )}
        </div>
        <DatePicker
          control={control}
          name="dueDate"
          id="dueDate"
          label="마감일"
          hasLabel
          placeholder="날짜를 선택해 주세요."
          className={styles.datePicker}
        />
        <div className={styles.tagArea}>
          <Input
            type="text"
            label="태그"
            hasLabel
            tag
            register={register('tags')}
            onKeyDown={handleKeyDown}
            className={styles.tagInput}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            errors={errors}
          />
          <div className={styles.tags}>
            {tagNameList.map((tagName, i) => {
              return (
                <Tag key={i} color={tagName.split(divison)[1]}>
                  <button
                    onClick={handleTagNameClick}
                    type="button"
                    style={{ backgroundColor: tagName.split(divison)[1] }}
                    data-color={tagName.split(divison)[1]}
                  >
                    {tagName.split(divison)[0]}
                  </button>
                </Tag>
              );
            })}
          </div>
        </div>
        <label className={styles.label}>이미지</label>
        <button type="button" onClick={handleImageFileDelete}>
          삭제
        </button>
        <label className={styles.fileInput} htmlFor="fileInput">
          {filePreview ? (
            <div className={styles.imagePreview}>
              <Image
                src={filePreview}
                alt="카드 이미지 미리보기"
                width={80}
                height={80}
                className={styles.filePreview}
              />
              <Image
                className={styles.imageIcon}
                src={pen}
                alt="펜 이미지"
                width={30}
                height={30}
              />
            </div>
          ) : (
            <div className={styles.imagePreview}>
              <Image
                className={styles.imageIcon}
                src={add}
                alt="더하기 이미지"
                width={30}
                height={30}
              />
            </div>
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          {...register('uploadedFile')}
        />
        <div className={styles.buttons}>
          <ModalButton className={styles.modalButton} onClick={handleClose}>
            취소
          </ModalButton>
          <ModalButton
            className={styles.modalButton}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {purpose === 'edit' ? '수정' : '생성'}
          </ModalButton>
        </div>
      </form>
    </Modal>
  );
}

export default EditToDoModal;
