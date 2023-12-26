import React, { useEffect, useState } from 'react';
import { delay } from '../../../hooks/delay';

import { IoSend } from "react-icons/io5";

const question = {
    "Sentence": "논거가 어떤 이론이나 논리, 논설 따위의 근거을 의미를 가지도록 문장을 생성한다.",
    "question": "위 문장에서 '논거'가 의미하는 바는 무엇인가요?",
    "answers": [
        {
            "answer": "이론",
            "correct": false
        },
        {
            "answer": "근거",
            "correct": false
        },
        {
            "answer": "논리",
            "correct": false
        },
        {
            "answer": "논설",
            "correct": true
        }
    ]
};

const MessageForm = ({ roundData, setMessages, messageFormRef }) => {
    const [message, setMessage] = useState('');
    const [quiz, setQuiz] = useState(question);
    const [aiIsTalking, setAiIsTalking] = useState(false);
    const [step, setStep] = useState(0); // Step 1: 퀴즈 풀기, Step 2: 퀴즈 정답자 안내 단계, Step 3: 쓰기, Step 4: 소리내어 읽기
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        switch (step) {
            case 1:
                async function stepOne() {
                    // TODO: 여기서 /study/quiz에 request, setQuiz(response.data.questions[0]);
                    for (let i = 0; i < quiz.answers.length; i++) {
                        if (quiz.answers[i].correct === true) {
                            setCorrectAnswer(quiz.answers[i].answer);
                        }
                    }
                    setAiIsTalking(true);
                    addAiMessage(`다음은 "${roundData.word}"를 사용한 문장입니다.`);
                    await delay();
                    addAiMessage(`"${quiz.Sentence}"`);
                    await delay();
                    addAiMessage(`${quiz.question}\n다음 <보기> 중 가장 적절한 답안을 입력해 주세요.`);
                    await delay();
                    addAiMessage(`<보기>${quiz.answers.map((ele) => '\n- ' + ele.answer).join('')}`);
                    setAiIsTalking(false);
                }
                stepOne();
                break;
            default:
        }
    }, [step]);
    
    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true }, // 사용자의 메시지
            // { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() },
        ]);
        userInputJudge();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSendMessage(message);
        setMessage('');
    };
    
    const addAiMessage = (aiSay, isTyping=false) => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `${aiSay}`, isUser: false, isTyping: isTyping, id: Date.now() },
        ]);
    }
    
    const userInputJudge = async () => {
        if (step === 0 && message == roundData.word) setStep(1);
        else if (step === 1) correctJudge();
        else if (step === 2) {
            if (message === roundData.word) studyWriting();
            else endOfLearning();
        }
    }

    const correctJudge = async () => {
        switch (message) {
            case correctAnswer:
                // 사용자가 원한다면 -> 학습 사이클 진행
                setStep(2);
                setAiIsTalking(true);
                addAiMessage(`정답입니다! 위 문장에서 단어 '${roundData.word}'는 '${correctAnswer}'(이)라는 의미로 사용되었습니다.`);
                await delay();
                addAiMessage(`👍`);
                await delay();
                addAiMessage(`정답을 맞힌 퀴즈에 한해서 쓰기/읽기 학습을 건너뛸 수 있습니다.\n\n이대로 학습을 마치시겠습니까?`);
                await delay();
                addAiMessage(`학습을 마치지 않고 학습을 진행하시겠다면, '${roundData.word}'(을)를 재입력해 주세요. 그 외 내용 입력 시 해당 단계에 대한 학습이 종료됩니다.`);
                setAiIsTalking(false);
                break;
            default:
                // 오답이었음과 정답이 뭐였는지 공개한 후, 학습 사이클 진행
                addAiMessage(`틀림 ㅋㅋ`);
                studyWriting();
        }
    }

    const studyWriting = async () => {
        setStep(3);
        setAiIsTalking(true);
        addAiMessage(`단어 '${roundData.word}' 학습을 진행합니다. 학습은 (1) 쓰기, (2) 읽기 순서로 이루어 집니다.`);
        await delay();
        addAiMessage(`'쓰기' 과정을 진행합니다. 다음 주어지는 문장들을 수기로 작성해 보시고, 사진을 업로드 해주세요.`);
        setAiIsTalking(false);

        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'handwriting' },
        ]);
    }
    
    const endOfLearning = async () => {
        // TODO: Main.jsx의 messages 배열 포함해, user study word 업데이트 하는 request 보내기
        setAiIsTalking(true);
        addAiMessage(`${roundData.id}단계 학습을 종료합니다.`);
        setAiIsTalking(false);
        setStep(-1);
    }
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            {/* TODO: 텍스트 길이 초과로 줄 바뀔 때마다, textarea가 늘어나고 줄 바꿈 되면 좋겠는데.. */}
            <input
                ref={messageFormRef}
                type="textarea"
                className={`message-input ${aiIsTalking ? 'bg-[#9FB8F9]': ''}`}
                value={aiIsTalking ? '시스템의 응답을 수신 중입니다. 잠시 기다려 주세요.' : message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" type="submit" disabled={message === ''}>
                <IoSend size={25} />
            </button>
        </form>
    );
};

export default MessageForm;