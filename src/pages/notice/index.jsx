import React from 'react';
import { Routes, Route } from 'react-router-dom';

import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

import NoticeList from './NoticeList';
import CreateNotice from './CreateNotice';
import NoticeDetail from './NoticeDetail';
import UpdateNotice from './UpdateNotice';


function Notice() {
  return (
    <div className='flex'>
      <div className='w-0 lg:w-[320px] pt-[63px] lg:block hidden'>
        <GoToLatestAndQuizList />
      </div>
      <div className='page bg-white'>
        <Routes>
          <Route path="" element={<NoticeList />} />
          <Route path="/:noticeId" element={<NoticeDetail />} />
          <Route path="/new" element={<CreateNotice />} />
          <Route path="/:noticeId/update" element={<UpdateNotice />} />
        </Routes>
      </div>
    </div>
  );
}

export default Notice;
