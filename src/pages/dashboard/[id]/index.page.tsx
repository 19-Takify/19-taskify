import React, { ReactElement, useState, useEffect } from 'react';
import Column from './components/Column';
import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import { GetServerSidePropsContext } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
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

type DashboardIdProps = {
  allData: ColumnCardData[] | [];
};

function DashboardId({ allData }: DashboardIdProps) {
  const [data, setData] = useState(allData);

  console.log(data);

  return <Column data={data} setData={setData} />;
}

DashboardId.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // beautiful-dnd 서버 초기화
  resetServerContext();

  try {
    const accessToken = context.req.cookies.accessToken;
    const id = context.params?.id;
    if (id) {
      const httpClient = new HttpClient(instance);
      const columnData: ColumnData = await httpClient.get(
        `/columns?dashboardId=${id}`,
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );
      const cardRequests = columnData.data.map(async (column: any) => {
        const columnCardData: ColumnCardData = await httpClient.get(
          `/cards?columnId=${column.id}`,
          {
            Authorization: `Bearer ${accessToken}`,
          },
        );
        columnCardData.columnId = column.id;
        return columnCardData;
      });
      const columnCardData = await Promise.all(cardRequests);

      return {
        props: {
          allData: columnCardData,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        allData: [],
      },
    };
  }
};

export default DashboardId;
