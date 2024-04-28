import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
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
import { TAG_COLORS } from '@/components/ColorPicker';
import useFilePreview from '@/hooks/useFilePreview';

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
};

type FormValues = {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
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
}: ModalProps) {
  const schema = z.object({
    columnId: z.any(),
    assigneeUserId: z.any(),
    title: z.string().min(1, { message: '제목은 필수입니다.' }),
    description: z.string().min(1, { message: '설명은 필수입니다.' }),
    dueDate: z.any(),
    tags: z.any(),
    imageUrl: z.any(),
    uploadedFile: z.any(),
    dashBoardId: z.any(),
  });

  console.log('바람구름');
  console.log(dashBoardId);
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
      dueDate: cardContent?.dueDate,
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
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagName = (e.target as HTMLInputElement).value;
      if (tagName !== '') {
        setTagNameList((prevList) => [
          ...prevList,
          `${tagName}!@#$%^&*${selectedColor}`,
        ]);

        (e.target as HTMLInputElement).value = '';
      }
    }
  };
  const handleTagNameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagName = (e.target as HTMLButtonElement).textContent || '';
    setTagNameList((prevList) => prevList.filter((tag) => tag !== tagName));
  };
  //태그네임이 중복됐을 때?
  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await axios.get(`/members?dashboardId=${dashBoardId}`);
        setMembers(response.data.members);
      } catch (error) {}
    };
    const getColumns = async () => {
      try {
        const response = await axios.get(`/columns?dashboardId=${dashBoardId}`);
        setColumns(response.data.data);
      } catch (error) {}
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
    // console.log(assignee);
    // console.log(columns);
    const state = columns.find((el) => el.id === cardContent?.columnId);
    setCurrentState(state);
    // console.log(members);
    setTagNameList(cardContent?.tags);
  }, [members, cardContent, columns]);

  useEffect(() => {
    console.log(currentState);
  }, [currentState]);
  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('송은');
    console.log(data);
    try {
      // data.assigneeUserId = 3079;
      // data.columnId = 22433;
      const timestamp = new Date(data.dueDate).getTime();
      const date = formatDate(timestamp);
      data.dueDate = date;
      // data.imageUrl = data.imageUrl[0];
      if (data.uploadedFile !== null && data.uploadedFile.length !== 0) {
        const imageFile = data.uploadedFile[0];
        const imgdata = new FormData();
        imgdata.append('image', imageFile);
        console.log(imgdata);
        const responseb = await axios.post(
          `/columns/22433/card-image`,
          imgdata,
        );
        const resultb = responseb.data;
        console.log(resultb);
        data.imageUrl = resultb.imageUrl;
      } else {
        data.imageUrl = null;
      }
      data.tags = tagNameList;
      data.dashboardId = dashBoardId;
      console.log('purpose', purpose);
      if (purpose === 'edit') {
        const response = await axios.put(`/cards/${cardContent?.id}`, data);
        const result = response.data;
        console.log(result);
        handleClose();
      }
      if (purpose === 'create') {
        console.log('강아지');
        const response = await axios.post('/cards', data);
        const result = response.data;
        console.log(result);
        handleClose();
      }
    } catch (error) {
      ///참고용
      // if (!isAxiosError(error)) {
      //   // `AxiosError`가 아닌 경우
      //   setToast('error', FETCH_ERROR_MESSAGE.UNKNOWN);
      //   return;
      // }
      // // `AxiosError`인 경우 에러 처리
      // if (!error.response) {
      //   setToast('error', FETCH_ERROR_MESSAGE.REQUEST);
      //   return;
      // }
      // const status = error.response?.status;
      // switch (status) {
      //   case 400:
      //     setError('password', {
      //       message: SERVER_ERROR_MESSAGE.PASSWORD.NOT_MATCH,
      //     });
      //     return;
      //   case 404:
      //     setError('email', { message: SERVER_ERROR_MESSAGE.USER.NOT_FOUND });
      //     return;
      // }
    }
  };
  const hasErrorMessage = errors && errors['description']?.message;

  const watchedUploadedFile = useWatch({
    name: 'uploadedFile',
    control,
  });
  const [filePreview] = useFilePreview(
    watchedUploadedFile,
    cardContent.imageUrl,
  );
  console.log(filePreview);
  return (
    <Modal showModal={showEditModal} handleClose={handleClose}>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.dropdowns}>
          <Dropdown
            usage="state"
            data={columns}
            initialData={{ title: currentState?.title, id: currentState?.id }}
            register={register('columnId')}
            setValue={setValue}
          />
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
        <Input
          type="text"
          label="제목"
          hasLabel
          required
          register={register('title')}
          errors={errors}
        />
        <label htmlFor="description">설명</label>
        <span className={styles.required}>*</span>
        <textarea
          className={styles.textarea}
          id="description"
          {...register('description')}
        />
        {hasErrorMessage && (
          <p className={styles.errorMessage}>
            {errors['description']?.message?.toString()}
          </p>
        )}
        <DatePicker
          control={control}
          name="dueDate"
          id="dueDate"
          label="마감일"
          hasLabel
          placeholder="날짜를 선택해 주세요."
          className={styles.datePicker}
        />
        <Input
          type="text"
          label="태그"
          hasLabel
          tag
          register={register('tags')}
          onKeyDown={handleKeyDown}
          className={styles.datePicker}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <div className={styles.tags}>
          {tagNameList.map((tagName, i) => {
            return (
              <Tag key={i} color={tagName.split(divison)[1]}>
                <button
                  onClick={handleTagNameClick}
                  type="button"
                  style={{ backgroundColor: tagName.split(divison)[1] }}
                >
                  {tagName.split(divison)[0]}
                </button>
              </Tag>
            );
          })}
        </div>
        <label className={styles.label}>이미지</label>
        <label className={styles.fileInput} htmlFor="fileInput">
          {filePreview ? (
            <div className={styles.imagePreview}>
              <Image
                src={filePreview}
                alt="카드 이미지 미리보기"
                width={80}
                height={80}
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
        <div>
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
