import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateShortUrl } from './pages/CreateShortUrl';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateShortUrl />} />
    </Routes>
  );
};
