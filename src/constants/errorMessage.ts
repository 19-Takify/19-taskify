export const VALID_ERROR_MESSAGE = {
  MAX: {
    TEN: '10자 이하로 입력해 주세요.',
  },
  MIN: {
    EIGHT: '8자 이상 입력해 주세요.',
  },
  EMAIL: {
    EMPTY: '이메일을 입력해 주세요.',
    INVALID: '이메일 형식으로 입력해 주세요.',
  },
  PASSWORD: {
    EMPTY: '비밀번호를 입력해 주세요.',
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  },
  NICKNAME: {
    EMPTY: '닉네임을 입력해 주세요.',
  },
  DASHBOARD: {
    EMPTY: '대시보드 이름을 입력해 주세요.',
  },
  COLUMN: {
    EMPTY: '컬럼 이름을 입력해 주세요.',
  },
} as const;

export const SERVER_ERROR_MESSAGE = {
  EMAIL: {
    INVALID: '이메일 형식으로 입력해 주세요.',
    DUPLICATE: '이미 사용중인 이메일입니다.',
    ALTERNATE: '다른 이메일을 입력해 주세요.',
  },
  PASSWORD: {
    EMPTY: '비밀번호를 입력해 주세요.',
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  },
  NICKNAME: {
    EMPTY: '닉네임을 입력해 주세요.',
  },
  USER: {
    NOT_FOUND: '존재하지 않는 유저입니다.',
    UNAUTHORIZED: '로그인이 필요합니다.',
  },
} as const;

export const FETCH_ERROR_MESSAGE = {
  REQUEST: '요청에 실패했습니다.',
  UNKNOWN: '잠시 후 다시 시도해 주세요.',
} as const;
