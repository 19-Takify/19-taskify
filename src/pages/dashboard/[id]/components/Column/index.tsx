import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import Card from '@/components/Card';
import styles from './Column.module.scss';
import PageButton from '@/components/Button/PageButton';

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
  data: T;
  setData: React.Dispatch<T>;
};

function Column({ data, setData }: ColumnProps<ColumnCardData[] | []>) {
  const [locateCard, setLocateCard] = useState<LocateCard>({
    cardId: null,
    startColumnId: null,
    endColumnId: null,
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    const newData = [...data];

    const sourceColumnIndex = newData.findIndex(
      (column) => column.columnId === parseInt(source.droppableId),
    );
    const destinationColumnIndex = newData.findIndex(
      (column) => column.columnId === parseInt(destination.droppableId),
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

    setData(newData);
    setLocateCard({
      cardId: Number(result.draggableId),
      startColumnId: Number(result.source.droppableId),
      endColumnId: Number(result.destination.droppableId),
    });
    console.log(result);
  };

  //드롭시 카드 컬럼 위치 수정
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(locateCard.cardId);
        const httpClient = new HttpClient(instance);
        await httpClient.put(`/cards/${locateCard.cardId}`, {
          columnId: locateCard.endColumnId,
        });
      } catch {
        return;
      }
    };

    fetchData();
  }, [data, locateCard]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ul className={styles.column}>
        {data.map((columnData) => (
          <Droppable
            key={columnData.columnId.toString()}
            droppableId={columnData.columnId.toString()}
          >
            {(provided) => (
              <li {...provided.droppableProps} ref={provided.innerRef}>
                <div className={styles.card}>
                  <div>
                    <strong>{columnData.columnTitle}</strong>
                    <p>{columnData.cards.length}</p>
                  </div>
                  <PageButton>카드</PageButton>
                  <Droppable droppableId={columnData.columnId.toString()}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
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
                              >
                                <Card cardData={cardData} />
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
      </ul>
    </DragDropContext>
  );
}

export default Column;
