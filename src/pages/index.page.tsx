import axios from '@/apis/axios';
import { GetServerSidePropsContext } from 'next';

// SSR에서 axios interceptor 값 받아와지지 않는 현상.
// https://github.com/axios/axios/issues/4976#issuecomment-1723822982
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(2);

  const cookies = context.req.cookies;
  const accessToken = cookies.accessToken;
  console.log('Home SSR accessToken: ', accessToken);
  if (accessToken) {
    try {
      const res = await axios.get('users/me', {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      console.log('me data: ', res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {},
  };
}

export default function Home() {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0OSwidGVhbUlkIjoiNC0xOSIsImlhdCI6MTcxMzUyNTQ2NSwiaXNzIjoic3AtdGFza2lmeSJ9.tImTj9DbHCr42QnQaBwayyX_lflTnqdGrqWvu-LEvzkbong';
  const handlePasswordChange = async () => {
    try {
      const res = await axios.put(
        'auth/password',
        {
          password: '1234qwer',
          newPassword: '12341234',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMe = async () => {
    try {
      const res = await axios.get('users/me', {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleMe}>
        테스트
      </button>
    </>
  );
}
