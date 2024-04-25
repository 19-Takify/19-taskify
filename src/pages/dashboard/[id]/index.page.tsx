import instance from '@/apis/axios';
import HttpClient from '@/apis/httpClient';
import Column from './components/Column';
import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import styles from './dashboardId.module.scss';

type ColumnData = {
  result: string;
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type ColumnCardData = {
  columnId: number;
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

function DashboardId() {
  const router = useRouter();
  const { id } = router.query;

  const [allData, setAllData] = useState<ColumnCardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      /*
      if (id) {
        const httpClient = new HttpClient(instance);
        const dashboardId = Number(id);
        const data = await httpClient.post('/cards', {
          assigneeUserId: 3079,
          dashboardId: dashboardId,
          columnId: 22200,
          title: '테스틋',
          description: '테스트입니당',
          dueDate: '2024-04-24 13:48',
          tags: ['테스트1', '테스트2', '테스트3'],
        });
        console.log(data);
      }
      */
      if (id) {
        const httpClient = new HttpClient(instance);
        const columnData: ColumnData = await httpClient.get(
          `/columns?dashboardId=${id}`,
        );
        const cardRequests = columnData.data.map(async (column: any) => {
          const columnCardData: ColumnCardData = await httpClient.get(
            `/cards?columnId=${column.id}`,
          );
          columnCardData.columnId = column.id;
          return columnCardData;
        });
        const columnCardData = await Promise.all(cardRequests);
        setAllData(columnCardData);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ul className={styles.column}>
      {allData &&
        allData.map((columnData) => (
          <li key={columnData.columnId}>
            <Column columnData={columnData} />
          </li>
        ))}
    </ul>
  );
}

DashboardId.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default DashboardId;
