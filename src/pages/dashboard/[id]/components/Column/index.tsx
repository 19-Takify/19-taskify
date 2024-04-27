import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect, useRef } from 'react';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import Card from '@/components/Card';
import styles from './Column.module.scss';
import PageButton from '@/components/Button/PageButton';
import Circle from '@/components/Circle';
import ToDoModal from '@/components/Modal/ToDoModal';
import Image from 'next/image';
import { useObserver } from '@/hooks/useObserver';
import setToast from '@/utils/setToast';
import ManageColumnModal from '@/components/Modal/ManageColumnModal';
import NewColumnModal from '@/components/Modal/NewColumnModal';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';

type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

type ColumnCardData = {
  columnId: number;
  columnTitle: string;
  cursorId: number;
  totalCount: number;
  cards: [
    {
      id: number;
      title: string;
      description: string;
      tags: string[];
      dueDate: string;
      assignee: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      imageUrl: string;
      teamId: string;
      columnId: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type LocateCard = {
  cardId: number | null;
  startColumnId: number | null;
  endColumnId: number | null;
};

type ColumnProps<T> = {
  dashboardId: number;
  userId: number;
  data: T;
  setData: React.Dispatch<T>;
};

function Column({
  dashboardId,
  userId,
  data,
  setData,
}: ColumnProps<ColumnCardData[]>) {
  const httpClient = new HttpClient(instance);
  const selectDashboard = useAtomValue(selectDashboardAtom);
  const [showModal, setShowModal] = useState(false);
  const [modalCardData, setModalCardData] = useState<CardData>();
  const [locateCard, setLocateCard] = useState<LocateCard>({
    cardId: null,
    startColumnId: null,
    endColumnId: null,
  });
  const [isOpenColumnModal, setIsOpenColumnModal] = useState({
    new: false,
    manage: false,
  });

  //무한 스크롤 용도
  const [startIndex, setStartIndex] = useState(0);
  const totalCount = Math.max(...data.map((item) => item.totalCount));

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    const newData = [...data];

    const sourceColumnIndex = newData.findIndex(
      (column) => column.columnId === Number(source.droppableId),
    );
    const destinationColumnIndex = newData.findIndex(
      (column) => column.columnId === Number(destination.droppableId),
    );

    const [movedCard] = newData[sourceColumnIndex].cards.splice(
      source.index,
      1,
    );
    newData[destinationColumnIndex].cards.splice(
      destination.index,
      0,
      movedCard,
    );

    //컬럼 totalCount 조정
    newData[destinationColumnIndex].totalCount += 1;
    newData[sourceColumnIndex].totalCount -= 1;

    setData(newData);

    setLocateCard({
      cardId: Number(result.draggableId),
      startColumnId: Number(result.source.droppableId),
      endColumnId: Number(result.destination.droppableId),
    });
  };

  const handleAddCardClick = async (columnId: number) => {
    //카드 생성 모달 나중에 구현

    await httpClient.post(`/cards`, {
      assigneeUserId: userId,
      dashboardId: dashboardId,
      columnId: columnId,
      title: '김치',
      description: '대한민국 최고 반찬',
      dueDate: '2024-04-27 18:00',
      tags: ['총각 김치', '배추김치'],
    });

    const dataRequests = data.map(async (column: any) => {
      const columnCardData = await httpClient.get<ColumnCardData>(
        `/cards?columnId=${column.columnId}`,
      );
      columnCardData.columnId = column.columnId;
      columnCardData.columnTitle = column.columnTitle;
      return columnCardData;
    });
    const columnCardData = await Promise.all(dataRequests);

    setData(columnCardData);
  };

  const handleDeleteCardClick = async () => {
    handleCloseModal();

    try {
      await httpClient.delete(`/cards/${modalCardData?.id}`);

      const dataRequests = data.map(async (column: any) => {
        const columnCardData = await httpClient.get<ColumnCardData>(
          `/cards?columnId=${column.columnId}`,
        );
        columnCardData.columnId = column.columnId;
        columnCardData.columnTitle = column.columnTitle;
        return columnCardData;
      });
      const columnCardData = await Promise.all(dataRequests);

      setData(columnCardData);
    } catch {
      setToast('error', '😰 카드 삭제에 실패했습니다.');
    }
  };

  const handleCardClick = (cardData: CardData) => {
    setShowModal(true);
    setModalCardData(cardData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInfiniteScroll = async () => {
    //데이터 다 불러오면 무한 스크롤 방지
    if (totalCount < startIndex) return;

    const nextIndex = startIndex + 10;
    const dataRequests = data.map(async (column: any) => {
      const columnCardData = await httpClient.get<ColumnCardData>(
        `/cards?size=${nextIndex}&columnId=${column.columnId}`,
      );
      columnCardData.columnId = column.columnId;
      columnCardData.columnTitle = column.columnTitle;
      return columnCardData;
    });
    const columnCardData = await Promise.all(dataRequests);
    setData(columnCardData);

    setStartIndex(nextIndex);
  };

  const sentinelRef = useObserver(handleInfiniteScroll);

  //드롭시 카드 컬럼 위치 수정
  useEffect(() => {
    const fetchData = async () => {
      if (locateCard.cardId) {
        try {
          await httpClient.put(`/cards/${locateCard.cardId}`, {
            columnId: locateCard.endColumnId,
          });
        } catch {
          return;
        }
      }
    };

    fetchData();
  }, [locateCard]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ul className={styles.columns}>
          {data.map((columnData) => (
            <Droppable
              key={columnData.columnId.toString()}
              droppableId={columnData.columnId.toString()}
            >
              {(provided) => (
                <li
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.columnList}
                >
                  <div className={styles.columnBox}>
                    <div className={styles.columnTitle}>
                      <div className={styles.columnName}>
                        <Circle color="#5534da" small />
                        <strong>{columnData.columnTitle}</strong>
                        <div className={styles.countBox}>
                          <p>{columnData.totalCount}</p>
                        </div>
                      </div>
                      <ManageColumnModal
                        columnData={{
                          id: columnData.columnId,
                          title: columnData.columnTitle,
                          dashboardId: selectDashboard.id,
                        }}
                      />
                    </div>
                    <PageButton
                      onClick={() => handleAddCardClick(columnData.columnId)}
                    >
                      카드
                    </PageButton>
                    <Droppable droppableId={columnData.columnId.toString()}>
                      {(provided) => (
                        <div
                          className={styles.cardList}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {columnData.cards.map((cardData, index) => (
                            <Draggable
                              key={cardData.id.toString()}
                              draggableId={cardData.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => handleCardClick(cardData)}
                                >
                                  <Card cardData={cardData} />
                                  {index === columnData.cards.length - 1 && (
                                    <div ref={sentinelRef}></div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  {provided.placeholder}
                </li>
              )}
            </Droppable>
          ))}
          {/*컬럼 갯수가 10개 넘어가면 추가 X*/}
          {data.length < 10 && (
            <li className={styles.addColumn}>
              <PageButton
                onClick={() =>
                  setIsOpenColumnModal((prev) => ({ ...prev, new: true }))
                }
              >
                새로운 컬럼 추가하기
              </PageButton>
            </li>
          )}
        </ul>
      </DragDropContext>
      {showModal && (
        <ToDoModal
          showModal={showModal}
          handleClose={handleCloseModal}
          cardData={modalCardData}
          handleDeleteCardClick={handleDeleteCardClick}
          dashboardId={dashboardId}
        />
      )}
      <NewColumnModal
        showModal={isOpenColumnModal.new}
        handleClose={() =>
          setIsOpenColumnModal((prev) => ({ ...prev, new: false }))
        }
        dashboardId={selectDashboard.id}
      />
    </>
  );
}

export default Column;