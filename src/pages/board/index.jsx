import React from 'react';
import { Routes, Route } from 'react-router-dom';

import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';
import ArticleList from './ArticleList';
import Article from './Article';
import CreateArticle from './CreateArticle';
import UpdateArticle from './UpdateArticle';


function Board() {
  return (
    <div className='flex'>
      <div className='w-0 lg:w-[320px] pt-[63px] lg:block hidden'>
        <GoToLatestAndQuizList />
      </div>
      <div className='page bg-white'>
        <Routes>
          <Route path="" element={<ArticleList />} />
          <Route path="/:postId" element={<Article />} />
          <Route path="/new" element={<CreateArticle />} />
          <Route path="/:postId/update" element={<UpdateArticle />} />
        </Routes>
      </div>
    </div>
  );
}

export default Board;
