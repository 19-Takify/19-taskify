import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { useEffect } from 'react';
import HttpClient from '@/apis/httpClient';

function Test() {
  //deleteCookie('accessToken');
  //console.log(getCookie('accessToken'));

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const httpClient = new HttpClient();
        const data: { accessToken: string } = await httpClient.post(
          '/auth/login',
          {
            email: 'skoo1100@naver.com',
            password: 'qweasd123',
          },
        );
        setCookie('accessToken', data.accessToken);
        console.log(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);
  */

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const httpClient = new HttpClient();
        const data = await httpClient.post('/dashboards/6603/invitations', {
          email: 'skoo1100@naver.com',
        });

        console.log(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);
  */

  return <div>index.page</div>;
}

export default Test;
