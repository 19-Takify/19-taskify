import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton';
import Dropdown from '@/components/Dropdown';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import Input from '@/components/Inputs/Input';
import DatePicker from '@/components/Inputs/DatePicker';
import axios from '@/apis/axios';
import Tag from '@/components/Tag';
import styles from './EditToDoModal.module.scss';
import { formatDate } from '@/utils/dateCalculator';

type CardContent = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
  cardContent: CardContent;
  dashBoardId: number;
};

type FormValues = {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
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
  showModal,
  handleClose,
  cardContent,
  dashBoardId,
}: ModalProps) {
  const schema = z.object({
    columnId: z.any(),
    assigneeUserId: z.any(),
    title: z.string().min(1, { message: '제목은 필수입니다.' }),
    description: z.string().min(1, { message: '설명은 필수입니다.' }),
    dueDate: z.any(),
    tags: z.any(),
    imageUrl: z.any(),
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
      columnId: 0,
      assigneeUserId: 0,
      title: '',
      description: '',
      dueDate: '',
      tags: [''],
      imageUrl: '',
    },
  });

  const [tagNameList, setTagNameList] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagName = (e.target as HTMLInputElement).value;
      setTagNameList((prevList) => [...prevList, tagName]);
    }
  };

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
      (el) => el.userId === cardContent.assignee.id,
    );
    setAssignee(assignee);
    console.log(columns);
    const state = columns.find((el) => el.id === cardContent.columnId);
    setCurrentState(state);
  }, [members, cardContent, columns]);

  useEffect(() => {
    console.log(currentState);
  }, [currentState]);
  const handleValidSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      // data.assigneeUserId = 3079;
      // data.columnId = 22433;
      const timestamp = new Date(data.dueDate).getTime();
      const date = formatDate(timestamp);
      data.dueDate = date;
      data.imageUrl = data.imageUrl[0];
      // const imageFile = data.imageUrl[0];
      // const imgdata = new FormData();
      // imgdata.append('image', imageFile);
      // const response = await axios.post(`/cards/${cardContent.id}`, data);
      // const result = response.data;
      // console.log(result);
      data.tags = tagNameList;
      const response = await axios.put(`/cards/${cardContent.id}`, data);
      const result = response.data;
      console.log(result);
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
  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <h1>할 일 수정</h1>
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
              id: assignee?.id,
            }}
            register={register('assigneeUserId')}
            setValue={setValue}
          />
          <Input
            type=""
            label="제목"
            hasLabel
            required
            register={register('title')}
          />
          <label htmlFor="description">설명</label>
          {/* 설명에 필수 표시 */}
          <textarea id="description" {...register('description')} />
          <DatePicker
            control={control}
            name="dueDate"
            id="dueDate"
            label="마감일"
            hasLabel
            placeholder="날짜를 선택해 주세요."
          />
          <Input
            type=""
            label="태그"
            hasLabel
            register={register('tags')}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.tags}>
            {tagNameList.map((tagName, i) => {
              console.log(tagName);
              return <Tag key={i}>{tagName}</Tag>;
            })}
          </div>
          <label>이미지</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('imageUrl')}
          />
          <ModalButton onClick={handleClose}>취소</ModalButton>
          <ModalButton type="submit" disabled={!isValid || isSubmitting}>
            수정
          </ModalButton>
          <button type="submit" disabled={!isValid || isSubmitting}>
            수정
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default EditToDoModal;

// import { useState } from "react"

// const [isOpen, setIsOpen]=useState(false)

// function handleClick(){
//   setIsOpen(true)
// }

// function handleClickb(){
//   setIsOpen(false)
// }

// <button onClick={handleClick}>모달열기</button>
// <EditToDoModal isOpen={isOpen} handleClickb={handleClickb}>

// const members = [
//   {
//     nickname: '짱구',
//     profileImageUrl: '',
//   },
//   {
//     nickname: '철수',
//     profileImageUrl: '',
//   },
//   {
//     nickname: '맹구',
//     profileImageUrl: '',
//   },
// ];
