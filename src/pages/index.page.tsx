import axios from '@/apis/axios';

export default function Home() {
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0OSwidGVhbUlkIjoiNC0xOSIsImlhdCI6MTcxMzUxOTU0OSwiaXNzIjoic3AtdGFza2lmeSJ9.yHOcu9ojaJrM3ox576Cr3Oj0xTW7g-3y2k2FHWMLUbk';
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
            Authorization: `bearer ${accessToken}`,
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
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
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
