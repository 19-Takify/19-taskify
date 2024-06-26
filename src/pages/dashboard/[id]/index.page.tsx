import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import Column from './components/Column';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import { GetServerSidePropsContext } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { setContext } from '@/apis/axios';
import { getMe } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import axios from '@/apis/axios';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const httpClient = new HttpClient(instance);
  const id = context.params?.id;
  const user = await getMe();

  // beautiful-dnd 서버 초기화
  resetServerContext();

  setContext(context);

  try {
    const userData = await httpClient.get<UserData>('/users/me');

    if (id) {
      const columnData = await httpClient.get<ColumnData>(
        `/columns?dashboardId=${id}`,
      );
      const cardRequests = columnData.data.map(async (column: any) => {
        const columnCardData = await httpClient.get<ColumnCardData>(
          `/cards?size=10&columnId=${column.id}`,
        );
        columnCardData.columnId = column.id;
        columnCardData.columnTitle = column.title;
        return columnCardData;
      });
      const columnCardData = await Promise.all(cardRequests);

      const dashboardResponse = await axios(`dashboards/${id}`);
      const currentDashboard = dashboardResponse.data;

      return {
        props: {
          dashboardId: Number(id),
          userId: userData.id,
          allData: columnCardData,
          user,
          currentDashboard,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        allData: [],
        user,
      },
    };
  }
};

type UserData = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

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

type DashboardIdProps = {
  dashboardId: number;
  userId: number;
  allData: ColumnCardData[] | [];
  currentDashboard: any;
};

function DashboardId({
  dashboardId,
  userId,
  allData,
  currentDashboard,
}: DashboardIdProps) {
  const router = useRouter();
  const [data, setData] = useState<ColumnCardData[]>([]);
  const [selectDashboard, setSelectDashboard] = useAtom(selectDashboardAtom);

  //페이지 이동시 데이터 받아오기 위해서 작성
  useEffect(() => {
    setData(allData);
    setSelectDashboard(currentDashboard);
  }, [router.asPath]);

  return (
    <>
      <Meta
        title={`Taskify | ${selectDashboard.title}`}
        url={useCurrentUrl()}
      />
      <div>
        <Column
          dashboardId={dashboardId}
          userId={userId}
          data={data}
          setData={setData}
        />
      </div>
    </>
  );
}

DashboardId.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DashBoardLayout>{page}</DashBoardLayout>
    </>
  );
};

export default DashboardId;
