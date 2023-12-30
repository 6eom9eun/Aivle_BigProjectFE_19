import style from "./style.css";
import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

const Main = () => {
    const token = sessionStorage.getItem('aivle19_token');

    const params = useParams();

    const scrollRef = useRef();
    const messageFormRef = useRef();
    
    const [didMount, setDidMount] = useState(false);
    const [aiIsTalking, setAiIsTalking] = useState(true);
    const [step, setStep] = useState(0);
    const [quizId, setQuizId] = useState(0);
    const [word, setWord] = useState('');
    const [quiz, setQuiz] = useState({});
    const [messages, setMessages] = useState([
        {
            text: `어서오세요.\n생성형 AI를 통한 문해력 향상 학습 서비스에 입장하셨습니다.`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `학습은 다음과 같은 단계를 거쳐 진행됩니다.\n\n1. 랜덤 단어 퀴즈 풀기\n2. 단어 연습(퀴즈 오답 시 필수, 정답 시 선택 사항)\n3. 학습한 단어를 활용해 작문 해보기`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `문제 생성을 시작합니다. 문제가 생성될 때까지 잠시 기다려 주세요.`,
            isUser: false, isTyping: false, id: Date.now()
        }
    ]); // 모든 채팅 메시지 저장
    const [writingWords, setWritingWords] = useState([]);
    
    useEffect(() => {
        if (params.key === undefined) {
            // 새 문제 생성, 저장
            setDidMount(true);
        }
        else {
            // 전에 풀던/풀이 완료한 문제 입장
            setAiIsTalking(false);
            importPrevQuiz();
        }
    }, []);

    useEffect(() => {
        if (didMount) {
            axios.get(process.env.REACT_APP_API_URL + '/study/quiz/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (response.status === 200) {
                    setQuizId(response.data.quiz_id);
                    setWord(response.data.word);
                    const tempQuiz = JSON.parse(response.data.quiz);
                    setQuiz(tempQuiz.questions[0]);
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [didMount])

    useEffect(() => {
        if (word !== '' && messages[messages.length - 1].text === '문제 생성을 시작합니다. 문제가 생성될 때까지 잠시 기다려 주세요.') {
            setMessages((prevMessages) => [
                ...prevMessages, // 이전 메시지들
                {
                    text: `이번에 학습하실 단어는 "${word}" 입니다.`,
                    isUser: false, isTyping: false, id: Date.now(), step: step
                },
                {
                    text: `입력창에 "${word}"를 입력하시면 단어 퀴즈가 시작됩니다.`,
                    isUser: false, isTyping: false, id: Date.now(), step: step
                },
            ]);
            setAiIsTalking(false);
        }
    }, [word, quiz]);

    const importPrevQuiz = async () => {
        await axios.get(process.env.REACT_APP_API_URL + '/study/quiz/' + params.key + '/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }).then(response => {
            if (response.status === 200) {
                setQuizId(response.data.quiz_id);
                setQuiz(JSON.parse(response.data.quiz));
                setWord(response.data.word);
                setMessages(JSON.parse(response.data.chat_log));
            }
        })
        .catch(error => {
            console.error(error);
        });
        
        await setStep(messages[messages.length - 1].step); // TODO: 이 setStep이 안 됨. 위의 setMessages가 한 박자 늦게 돼서 그런 것 같은데..
    }

    return (
        <div className='flex'>
            <div className='w-0 lg:w-[400px] pt-[63px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList
                        token={token}
                        quizId={quizId}
                        messages={messages}
                        scrollRef={scrollRef}
                        step={step}
                        setStep={setStep}
                        writingWords={writingWords}
                        setWritingWords={setWritingWords}
                    />
                </div>
                <div className="control">
                    {/* fixed 된 프롬프트 창 + 양 방향 화살표 버튼 */}
                    {/* 프롬프트 창 */}
                    <MessageForm
                        quizId={quizId}
                        word={word}
                        quiz={quiz}
                        messages={messages}
                        setMessages={setMessages}
                        messageFormRef={messageFormRef}
                        step={step}
                        setStep={setStep}
                        aiIsTalking={aiIsTalking}
                        setAiIsTalking={setAiIsTalking}
                        writingWords={writingWords}
                    />
                    {/* <div> */}
                        {/* 양 방향 화살표 버튼(이전 회차, 다음 회차) */}
                        {/* <div>⬅️</div> */}
                        {/* <div>➡️</div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Main;