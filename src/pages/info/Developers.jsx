import style from "./style.css";
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoItem from './InfoItem.jsx';

import { MdOutlineQuiz } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import { FaKeyboard } from "react-icons/fa";

const iconStyle = {
    margin: '0 auto',
    backgroundColor: 'var(--color-primary-500)',
    padding: '1rem',
    borderRadius: '9999px'
};

const Developers = () => {
    const nav = useNavigate();

    const mainImgContainerRef = useRef();
    
    useEffect(() => {
        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;

        const handleWheel = (event) => {
            event.preventDefault();

            var delta = 0;

            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }

            var moveTop = window.scrollY;
            var elmSelector = elm[Math.round(moveTop / window.innerHeight)];

            // 휠을 아래로 돌릴 때: 다음 섹션으로 이동
            if (delta < 0) {
                if (elmSelector !== elmCount - 1) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }
            // 휠을 위로 돌릴 때: 이전 섹션으로 이동
            else {
                if (elmSelector !== 0) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }

            const body = document.querySelector('html');
            window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
        };

        // 문서에 wheel 이벤트 리스너를 추가
        document.addEventListener('wheel', handleWheel);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleMouseMoveMainImg = (e) => {
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        var rotateY = -1/20 * x + 12;
        var rotateX = 1/20 * y - 12;

        if (mainImgContainerRef.current) mainImgContainerRef.current.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);`;
    }

    const handleMouseOutMainImg = () => {
        if (mainImgContainerRef.current) mainImgContainerRef.current.style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg);'
    }

    return (
        <div>
            <div className='section w-full min-h-[100vh] flex justify-center items-center lg:gap-32 pt-[63px] bg-[var(--color-primary-500)]'>
                <div className="text-white lg:p-0 px-4 py-10">
                    <div className='mt-10 lg:w-[720px] w-full text-justify'>
                        <div className='text-white introduce'>
                        <div className="lg:text-6xl text-4xl">AIVEL 19조 개발자들은 <br/>항상 열정으로 개발합니다.</div>
                        <div className="text-xl font-light mt-4">저희 개발자들을 소개합니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-32 bg-[var(--color-primary-400)] py-10'>
                <div className="text-white lg:p-0 px-4">
                </div>
                <div className='min-w-[50vh] min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-5'>
                    <InfoItem Icon={<SiFuturelearn size={150} color="white" style={iconStyle} />} title={'정민권'} describe={<><strong>AI</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                    <InfoItem Icon={<MdOutlineQuiz size={150} color="white" style={iconStyle} />} title={'홍주성'} describe={<><strong>AI 팀장</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                    <div className='text-white introduce'>
                        <div className="lg:text-6xl text-4xl">AI</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">인공지능</div>
                    </div>
                </div>
            </div>
            <div className='section w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-32 bg-[var(--color-primary-400)] py-10'>
                <div className='text-white introduce'>
                </div>
                <div className='min-w-[50vh] min-h-[50vh] flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-5'>
                    <div className='text-white introduce'>
                        <div className="lg:text-6xl text-4xl">FE</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">프론트엔드</div>
                    </div>
                    <InfoItem Icon={<MdOutlineQuiz size={150} color="white" style={iconStyle} />} title={'김예원'} describe={<><strong>FN 파트장</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                    <InfoItem Icon={<SiFuturelearn size={150} color="white" style={iconStyle} />} title={'이준혁'} describe={<><strong>FN</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                </div>
            </div>
            <div className='section w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-32 bg-[var(--color-primary-400)] py-10'>
            <div className='text-white introduce'>
                </div>
                <div className='min-w-[50vh] min-h-[50vh] flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-5'>
                    <div className='text-white introduce'>
                            <div className="lg:text-6xl text-4xl">BE</div>
                            <div className="lg:text-4xl text-2xl lg:mt-4">백엔드</div>
                    </div>
                    <InfoItem Icon={<MdOutlineQuiz size={150} color="white" style={iconStyle} />} title={'곽범근'} describe={<><strong>BE 파트장</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                    <InfoItem Icon={<SiFuturelearn size={150} color="white" style={iconStyle} />} title={'강현수'} describe={<><strong>BE</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                    <InfoItem Icon={<FaKeyboard size={150} color="white" style={iconStyle} />} title={'윤희정'} describe={<><strong>BE</strong><br/>곧 언어적 경험의 차이! 단계 별 학습 사이클을 따라 경험을 쌓아보세요.</>} />
                </div>
            </div>
        </div>
    );
};

export default Developers