import React, { useState, useEffect } from "react";
import QuizItem from "./QuizItem";
import axios from 'axios';

import { IoCreateOutline, IoRefresh } from "react-icons/io5";

const GoToLatestAndQuizList = () => {
    const token = sessionStorage.getItem('aivle19_token');

    const [quizlist, setQuizlist] = useState([]);

    useEffect(() => {
        callQuizHistory();
    }, []);

    const callQuizHistory = () => {
        axios.get(process.env.REACT_APP_API_URL + '/study/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setQuizlist(response.data);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div style={{"font-family": "sans-serif"}}>
            <div className="mt-6 px-3">
                {/* new chat */}
                <div className="text-left text-[var(--color-info-900)]">
                    새 시작
                </div>
                <a className="flex gap-2 text-left bg-[var(--color-primary-100)] hover:bg-[var(--color-primary-200)] w-full rounded-full lg:my-0 px-6 py-3 text-[var(--color-primary-500)]"
                    href={process.env.PUBLIC_URL + "/"}>
                    <IoCreateOutline size={25} />
                    <span className="truncate">새 문제 시작하기</span>
                </a>
            </div>
            <div className="mt-6">
                {/* history list */}
                <div className="flex justify-between items-center px-3 text-left text-[var(--color-info-900)]">
                    <div>학습 목록</div>
                    <button
                        className="p-1 lg:animate-pulse bg-[var(--color-primary-100)] hover:bg-[var(--color-primary-200)] rounded-full"
                        onClick={callQuizHistory} type="button">
                        <IoRefresh size={25} />
                    </button>
                </div>
                <div className="history">
                    {
                        quizlist.map((ele) =>
                            <QuizItem data={ele} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default GoToLatestAndQuizList;