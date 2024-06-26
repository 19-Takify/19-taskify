<p align="center"><img src="https://github.com/19-Takify/19-taskify/assets/55544307/2a572a62-df38-4c03-893a-d0c2ddfdaaee" alt="Taskify" width="400" height="160"></p><br>
<br>


# Taskify - 일정 관리 서비스
- 개발 기간 : 2024.04.15 ~ 2024.04.29
- 배포 주소 : https://team19-main.vercel.app
- 노션 주소 : https://devwqc.notion.site/6e51ebc1f13045a09a656d481a06289e?pvs=4

**개발 모드로 실행하기**
```
git clone https://github.com/19-Takify/19-taskify.git

npm install

npm run dev
```
***
<br>


## 📂 프로젝트 소개
**Taskify는 쉽고 간편하게 대시보드를 생성하고 일정을 만들어 관리 및 공유 할 수 있는 서비스 입니다.**

- 현대인의 바쁜 생활과 다양한 업무를 고려하여 사용자가 쉽고 간편하게 일정을 관리하는 서비스를 제공합니다.
- 상대방의 일정을 확인할 수 있고 공유할 수 있어서 직장인, 모임, 동아리 등 단체 활동에 안성 맞춤인 서비스 입니다.
<br>

*** 

## ⚙️ TechStack 

<div align="left">


<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5a29e4?style=for-the-badge&logo=axios&logoColor=white">

<br/>
<br/>
<br/>
<br/>

## 🍃 Communication

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/Discord-5865f2?style=for-the-badge&logo=discord&logoColor=black">
<img src="https://img.shields.io/badge/Figma-f24e1e?style=for-the-badge&logo=figma&logoColor=black">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

</div>
<br>
<br/>
<br/>

## 👏 팀원 구성
|<img src="https://avatars.githubusercontent.com/u/56138199?v=4,q45402sk,Songeun Kee,https://github.com/q45402sk" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/96522163?v=4,yb3143,박유빈,https://github.com/yb3143" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/55544307?v=4,skoo1100,skoo1100,https://github.com/skoo1100" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/162881886?v=4,woo29,우혁,https://github.com/woo29" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/98067115?v=4,devwqc,정봉찬,https://github.com/devwqc" width="150" height="150"/>
|:-:|:-:|:-:|:-:|:-:
|FE : 기송은 <br/> [@q45402sk](https://github.com/q45402sk)|FE : 박유빈 <br/> [@yb3143](https://github.com/yb3143)|FE : 여승구 <br/> [@skoo1100](https://github.com/skoo1100)|FE : 이우혁 <br/> [@woo29](https://github.com/woo29)|FE : 정봉찬 <br/> [@devwqc](https://github.com/devwqc)
<br>


## 🚩 역할 분담
### 인증 팀
**기송은**
- 로그인 & 회원가입 페이지
- Cookie 인증
- 할 일 수정 모달

**정봉찬**
- 로그인 & 회원가입 페이지
- Cookie 인증
- 컬럼 모달

### 기능 팀
**박유빈**
- 모달 컴포넌트
- 디자인 작업

**여승구**
- 버튼 공통 컴포넌트
- 나의 대시보드 페이지
- 대시보드 페이지

**이우혁**
- 랜딩 페이지
- 대시보드 페이지
- 대시보드 & 계정 관리 페이지
- 404 페이지
<br>


## 📝 컨벤션
<details>
    <summary> <strong>코드 컨벤션</strong> </summary>
  <br/>
  
  **폴더 구조**
  
  - 공통 컴포넌트: `src/components/`에 작성
  - 페이지에 종속된 컴포넌트: `src/pages/페이지명/components`에 작성
  
  **코드 네이밍**
  - 변수, 함수: `카멜 케이스`로 작성
  - 상수: `대문자 + 스네이크 네이밍`으로 작성
  - 클래스, 컴포넌트, 타입: `파스칼 케이스`로 작성
  
  **파일 네이밍**
  - components, pages: `파스칼 케이스`로 작성
  - hooks: `use prefix`로 작성
  - 그 외: `카멜 케이스`로 작성
  
  **rem**
  - `1rem = 16px`
  - `0.25rem(4px) 단위`로 작성
  
  **type**
  - 타입은 interface가 아닌 `type`으로 작성
</details>
<br>

<details>
    <summary> <strong>Git 컨벤션</strong> </summary>
  <br/>

**git 전략** <br>
<img src="https://github.com/19-Takify/19-taskify/assets/55544307/fc049688-aa80-44c2-a8d2-03da86a05e9e" width="600px">
```
- main: 배포 브랜치
- develop: feat 브랜치에서 PR 보내는 브랜치
- feat: 기능 개발 브랜치
```

**Git 커밋**
```
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: css 수정
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 패키지 매니저 수정
- design: css UI 디자인 변경
- comment: 필요한 주석 추가 및 변경
- rename: 파일명 수정 및 파일 이동
- remove: 파일 삭제
```

</details>
<br>


## 💻 프로젝트 내용
### 랜딩 페이지
![랜딩](https://github.com/19-Takify/19-taskify/assets/55544307/078c5775-2d97-4389-97f8-7835f22776f6)<br>
- taskify 소개 및 로그인, 회원가입 페이지로 이동할 수 있습니다.

### 로그인 & 회원가입 페이지
![로그인](https://github.com/19-Takify/19-taskify/assets/55544307/96b0995e-d8df-4b42-a2f1-a1c908299782)<br>
![회원가입](https://github.com/19-Takify/19-taskify/assets/55544307/af97eb12-13c0-47de-8d9d-1712ffdcf0f0)<br>
- Cookie로 AccessToken을 저장하고 인증하여 로그인과 회원가입을 할 수 있습니다.

### 나의 대시보드 페이지
![나의 대시보드](https://github.com/19-Takify/19-taskify/assets/55544307/8016599b-e6b5-42b9-b9e6-1537eb430c02)<br>
- 로그인에 성공하면 나의 대시보드 페이지에 접속합니다.<br>
- 새로운 대시보드 생성과 다른 유저가 초대한 대시보드 목록이 보입니다.

### 대시보드 페이지
![대시보드](https://github.com/19-Takify/19-taskify/assets/55544307/e549b2bb-9fde-43cc-b113-e7a3dd7784fe)<br>
- 대시보드에서 일정을 관리할 수 있는 페이지입니다.<br>
- 일정을 drag & drop으로 구현하여 간편하게 사용할 수 있습니다.

### 대시보드 관리 페이지
![대시보드 관리](https://github.com/19-Takify/19-taskify/assets/55544307/b7db7bf3-19bc-45ab-8a8b-ab5f235055c0)<br>
- header에 관리 버튼을 누르면 대시보드 관리 페이지에 접속합니다.<br>
- 대시보드 이름 변경 및 삭제가 가능하고, 대시보드 구성원과 초대 한 내역이 보입니다.

### 계정 관리 페이지
![계정 관리](https://github.com/19-Takify/19-taskify/assets/55544307/f6675e90-593d-41dd-a4a4-5f54e8bd1eb7)<br>
- header에 계정에 마우스를 올려 마이페이지를 클릭하면 접속합니다.<br>
- 프로필과 비밀번호를 변경할 수 있습니다.

### 404 페이지
![404](https://github.com/19-Takify/19-taskify/assets/55544307/f073ae90-17b6-450d-9508-57b2c6a45cfc)<br>
- 잘못된 링크에 접속하면 404 페이지로 이동합니다.<br>
- 로그인 상태에선 나의 대시보드 페이지로 이동합니다.<br>
- 로그아웃 상태에선 랜딩 페이지로 이동합니다.
