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

const Info = () => {
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
                    <div className='introduce'>
                        <div className="lg:text-6xl text-4xl">LiQuest,</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">문해력을 깨우는 모험의 시작!</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">말하고, 듣고, 쓰기를 경험합니다.</div>
                    </div>
                    <div className='mt-10 lg:w-[600px] w-full text-justify'>
                        <div className="text-xl font-light">문해력이란 <span className="font-semibold">'글을 읽을 수 있는 능력'</span>을 말합니다. 어휘력이 풍부한 사람은 글을 막힘 없이 읽을 수 있지만, 그렇지 않은 사람은 글을 읽고 이해하기에 어려움을 겪습니다.</div>
                        <div className="text-xl font-light mt-4">어떤 어휘가 어떤 문장에서 어떻게 사용되는지, LiQuest와 함께 언어적 경험을 쌓아봅시다.</div>
                    </div>
                    <button className='text-lg mt-10 py-4 bg-[var(--color-primary-700)] hover:bg-[var(--color-primary-900)] w-[200px] hover:w-full transition-all rounded-full' type='button' onClick={() => {nav('/login');}}>시작하기</button>
                </div>
                <div ref={mainImgContainerRef} onMouseMove={handleMouseMoveMainImg} onMouseOut={handleMouseOutMainImg} className='rounded-full transition-all'>
                    <div className='info-graphic lg:w-[600px] lg:h-[600px] md:w-[400px] rounded-full hover:w-[620px] hover:h-[620px] transition-all' />
                    {/* <a className='relative bottom-[4em] text-xs'
                        href="https://kr.freepik.com/free-vector/college-project-concept-illustration_35020245.htm#query=literacy&position=1&from_view=search&track=sph&uuid=a56fde11-07fb-45d7-bc27-b79b331cc0c1">출처 Freepik 작가 storyset</a> */}
                </div>
            </div>
            <div className='section w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-32 bg-[var(--color-primary-400)] py-10'>
                <div className="text-white lg:p-0 px-4">
                    <div className='introduce'>
                        <div className="lg:text-5xl text-2xl"><span className="border-b-3">LiQuest</span>에서</div>
                        <div className="lg:text-5xl text-2xl lg:mt-8 lg:mb-0 mb-8">시작해 보세요.</div>
                    </div>
                </div>
                <div className='min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-5'>
                    <InfoItem Icon={<MdOutlineQuiz size={150} color="white" style={iconStyle} />} title={'단어 퀴즈'} describe={'잘 알고 있나요?\n익숙지 않은 어휘는 없는지\n확인해 봅시다!'} />
                    <InfoItem Icon={<SiFuturelearn size={150} color="white" style={iconStyle} />} title={'단어 연습장'} describe={'문해력 차이는 곧\n언어적 경험의 차이!\n단계 별 학습 사이클을 따라\n경험을 쌓아보세요.'} />
                    <InfoItem Icon={<FaKeyboard size={150} color="white" style={iconStyle} />} title={'작문해보기'} describe={'학습한 단어를 조합해\n작문해 봅시다!\nChatGPT가 확인하고\n피드백을 제공합니다.'} />
                </div>
            </div>
        </div>
    );
};

export default Info;