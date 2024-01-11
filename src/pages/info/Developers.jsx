import style from "./style.css";
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoItem from './InfoItem.jsx';

import Developer1 from "./developersProfile/Kiruchoco.jpg";
import Developer2 from "./developersProfile/mingweon.png";
import Developer3 from "./developersProfile/yewon-saurus.png";
import Developer4 from "./developersProfile/koeyhnujeel.png";
import Developer5 from "./developersProfile/6eom9eun.png";
import Developer6 from "./developersProfile/hyunsu01.jpg";
import Developer7 from "./developersProfile/hdong08.jpg";

const developers = [
    {
        image: Developer1,
        name: "홍주성",
        role: "팀장 & AI 파트장",
        message: "AI 직무를 맡기 전에는 생성형 AI를 활용해 무언가를 만든다는 것이 쉽울 것이라 생각했지만, 제가 원하는 결과물이 안 나와서 힘들었습니다. 생성형 AI에 대해 많은 것을 배워가는 시간이 된 것 같습니다.",
        github: "https://github.com/Kiruchoco",
    },
    {
        image: Developer2,
        name: "정민권",
        role: "AI 구현",
        message: "OCR과 STT, TTS 기술에 대한 조사와 코드 적용을 위한 오류해결 및 테스트 과정에서 해당 기술과 협업 과정에 대해 더욱 이해할 수 있는 기회가 되었습니다.",
        github: "https://github.com/mingweon",
    },
    {
        image: Developer3,
        name: "김예원",
        role: "FE 파트장",
        message: "주제가 '아이들의 문해력 증진'이라는 의미있는 주제여서 확실히 동기부여가 됐고, 챗봇 형식의 서비스를 개발하는 것도 처음이었기 때문에 더욱 흥미와 애정을 가지고 참여할 수 있었습니다.",
        github: "https://github.com/yewon-saurus",
    },
    {
        image: Developer4,
        name: "이준혁",
        role: "FE 구현",
        message: "백엔드 직무를 희망하지만, 리액트 개발 경험 또한 웹 개발 역량 상승에 많은 도움이 됐습니다. 또한 미니 프로젝트가 아닌 첫 팀 프로젝트를 좋은 팀원들과 함께해서 좋은 경험으로 남을 것 같습니다.",
        github: "https://github.com/koeyhnujeel",
    },
    {
        image: Developer5,
        name: "곽범근",
        role: "BE 파트장",
        message: "직접 AI 기반 api를 구축하고 AI 플랫폼을 팀원들과 함께 만들어 냈다는 것이 매우 인상적이었습니다.",
        github: "https://github.com/6eom9eun",
    },
    {
        image: Developer6,
        name: "강현수",
        role: "BE 구현",
        message: "백엔드, 프론트엔드, AI의 처리 과정 및 기술들에 대한 이해를 높일 수 있었습니다. 또한 좋은 팀원들을 만나서 많은 것을 배울 수 있었습니다.",
        github: "https://github.com/hyunsu01",
    },
    {
        image: Developer7,
        name: "윤희정",
        role: "BE 구현",
        message: "개발이 분야가 나누어져 있어, 각 파트에서 작동되는 원리를 이해하고 수행하는게 어려웠지만, 조원들의 도움으로 많은 것을 배울 수 있는 좋은 기회였습니다.",
        github: "https://github.com/hdong08",
    },
];

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

    const DeveloverItem = ({github, image, name, role, message}) => {
        return (
            <div>
                <a href={github} target="_blank" className="developer-box"><InfoItem Icon={<img src={image} width={180} />} title={name} describe={<><strong>{role}</strong><br/><div className="text-sm text-justify">{message}</div></>} /></a>
                <p className="speech-bubble">Click and visit my GitHub!</p>
            </div>
        );
    }

    return (
        <div>
            <div className='section w-full min-h-[100vh] flex justify-center items-center lg:gap-32 pt-[63px] bg-[var(--color-primary-500)]'>
                <div className="text-white lg:p-0 px-4 py-10">
                    <div className='mt-10 w-full text-justify'>
                        <div className='text-white introduce'>
                        <div className="lg:text-6xl text-4xl">AIVLE 19조 개발자들은</div>
                        <div className="lg:text-6xl text-4xl mt-2">항상 열정으로 개발합니다.</div>
                        <div className="text-xl font-light mt-4">저희 개발자들을 소개합니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section w-full min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-32 bg-[var(--color-primary-400)] py-10'>
                <div className="text-white lg:p-0 px-4">
                </div>
                <div className='min-w-[50vh] min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-5'>
                    <DeveloverItem github={developers[0].github} image={developers[0].image} name={developers[0].name} role={developers[0].role} message={developers[0].message} />
                    <DeveloverItem github={developers[1].github} image={developers[1].image} name={developers[1].name} role={developers[1].role} message={developers[1].message} />
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
                    <DeveloverItem github={developers[2].github} image={developers[2].image} name={developers[2].name} role={developers[2].role} message={developers[2].message} />
                    <DeveloverItem github={developers[3].github} image={developers[3].image} name={developers[3].name} role={developers[3].role} message={developers[3].message} />
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
                    <DeveloverItem github={developers[4].github} image={developers[4].image} name={developers[4].name} role={developers[4].role} message={developers[4].message} />
                    <DeveloverItem github={developers[5].github} image={developers[5].image} name={developers[5].name} role={developers[5].role} message={developers[5].message} />
                    <DeveloverItem github={developers[6].github} image={developers[6].image} name={developers[6].name} role={developers[6].role} message={developers[6].message} />
                </div>
            </div>
        </div>
    );
};

export default Developers