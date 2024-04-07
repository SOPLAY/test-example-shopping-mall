import { screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from '@/pages/error/components/ErrorPage';
import render from '@/utils/test/render';

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 -> 스파이 함수
const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);
  const button = await screen.getByRole('button', { name: '뒤로 이동' });
  await user.click(button);

  expect(navigateFn).toHaveBeenNthCalledWith(1, -1);
});
