import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton';
import Dropdown from '@/components/Dropdown';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/Inputs/Input';
import DatePicker from '@/components/Inputs/DatePicker';
import axios from '@/apis/axios';
import Tag from '@/components/Tag';
import styles from './EditToDoModal.module.scss';
import { formatDate } from '@/utils/dateCalculator';
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
  handleCancel: () => void;
  cardContent: CardList;
  dashBoardId: number;
  purpose: string;
  resetDashboardPage: () => void;
  columnTitle: string;
  columnId: number;
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
  currentImage: string | null;
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
  handleCancel,
  cardContent,
  dashBoardId,
  purpose,
  resetDashboardPage,
  columnTitle,
  columnId,
}: ModalProps) {
  const schema = z.object({
    columnId: z.any(),
    assigneeUserId: z.any(),
    title: z.string().min(1, { message: '제목은 필수입니다.' }),
    description: z
      .string()
      .min(1, { message: '설명은 필수입니다.' })
      .max(200, { message: '200자 이하로 입력해 주세요.' }),
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
      currentImage: cardContent?.imageUrl,
    },
  });

  const [selectedColor, setSelectedColor] = useState(
    TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
  );
  const [tagNameList, setTagNameList] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  //기존 담당자
  const [assignee, setAssignee] = useState<Member | undefined>();
  //기존 상태
  const [currentState, setCurrentState] = useState<Column | undefined>();
  const hasErrorMessage = errors && errors['description']?.message;
  const watchedUploadedFile = useWatch({
    name: 'uploadedFile',
    control,
  });
  //올린 파일을 url로 반환해주는 훅
  const { imgSrc: filePreview, setImgSrc: setFilePreview } = useFilePreview(
    watchedUploadedFile,
    cardContent.imageUrl,
  );
  let title;
  const divison = '!@#$%^&*';
  if (purpose === 'edit') {
    title = '할 일 수정';
  }
  if (purpose === 'create') {
    title = '할 일 생성';
  }

  //태그를 입력하고 Enter를 눌렀을 때 동작하는 핸들러
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

  //태그를 클릭했을 때 삭제하는 핸들러
  const handleTagNameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagName = (e.target as HTMLButtonElement).textContent || '';
    const color = e.currentTarget.dataset.color;
    const mergedTag = `${tagName}${divison}${color}`;
    setTagNameList((prevList) => prevList.filter((tag) => tag !== mergedTag));
  };

  useEffect(() => {
    //멤버 목록 가져오기
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

    //컬럼 목록 가져오기
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
  }, [dashBoardId]);

  //기존에 선택되어 있던 담당자, 상태를 표시하기 위한 훅
  useEffect(() => {
    const assignee = members.find(
      (el) => el.userId === cardContent?.assignee?.id,
    );
    setAssignee(assignee);
    const state = columns.find((el) => el.id === cardContent?.columnId);
    setCurrentState(state);
    setTagNameList(cardContent?.tags);
  }, [members, cardContent, columns]);

  //수정/생성 버튼을 눌렀을 때 실행되는 핸들러
  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const timestamp = new Date(data.dueDate).getTime();
      const date = formatDate(timestamp);
      if (data.uploadedFile !== null && data.uploadedFile.length !== 0) {
        const imageFile = data.uploadedFile[0];
        const imgdata = new FormData();
        imgdata.append('image', imageFile);
        //이미지 url을 받아오기 위한 요청
        const imageResponse = await axios.post(
          `/columns/${columnId}/card-image`,
          imgdata,
        );
        const result = imageResponse.data;
        data.imageUrl = result.imageUrl;
      } else {
        data.imageUrl = data.currentImage;
      }
      data.tags = tagNameList;
      data.dashboardId = dashBoardId;
      //할 일 수정
      if (purpose === 'edit') {
        await axios.put(`/cards/${cardContent?.id}`, {
          ...data,
          dueDate: date,
        });
        handleClose();
        resetDashboardPage();
      }
      //할 일 생성
      if (purpose === 'create') {
        await axios.post('/cards', {
          ...data,
          dueDate: date,
        });
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
            {purpose === 'create' ? (
              <Dropdown
                usage="state"
                data={columns}
                //이 값으로 하지 않으면 초기 state값이 없음
                initialData={{
                  title: currentState?.title,
                  id: currentState?.id,
                }}
                register={register('columnId')}
                setValue={setValue}
              />
            ) : (
              <Dropdown
                usage="state"
                data={columns}
                //이 값으로 하지 않으면 카드를 옮겼을 때 state 초기값에 반영되지 않음
                initialData={{ title: columnTitle, id: columnId }}
                register={register('columnId')}
                setValue={setValue}
              />
            )}
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
            onKeyDown={(e) => {
              if (!e.nativeEvent.isComposing) {
                handleKeyDown(e);
              }
            }}
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

        <label className={styles.fileInput} htmlFor="fileInput">
          {filePreview ? (
            <div className={styles.imagePreview}>
              <Image
                src={filePreview}
                alt="카드 이미지 미리보기"
                className={styles.filePreview}
                fill
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
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleImageFileDelete}
        >
          삭제
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          {...register('uploadedFile')}
        />
        <div className={styles.buttons}>
          <ModalButton className={styles.modalButton} onClick={handleCancel}>
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
