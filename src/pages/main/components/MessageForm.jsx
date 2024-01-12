import React, { useEffect, useState } from 'react';
import { delay, dateToTimestamp } from '../../../utils';

import { IoSend } from "react-icons/io5";
import axios from 'axios';

const MessageForm = ({ quizId, word, quiz,
    correctAnswer, setCorrectAnswer, studySentence, setStudySentence,
    messages, setMessages, messageFormRef, step, setStep, aiIsTalking,
    setAiIsTalking, writingWords }) => {
    const token = sessionStorage.getItem('aivle19_token');
    const username = sessionStorage.getItem('aivle19_username');

    const [message, setMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState();

    useEffect(() => {
        switch (step) {
            case 101: // 100: 퀴즈
                startQuiz();
                break;
            case 102:
                guideToCorrect();
                break;
            case 201: // 200: 쓰기
                studyHandWriting();
                break;
            case 202:
                studyHandWriting2();
                break;
            case 301: // 300: 소리내어 읽기
                studyReading();
                break;
            case 302:
                studyReading2();
                break;
            case 303:
                endOfReading();
                break;
            case 401: // 400: 작문
                isItTurnToWriting();
                break;
            case 402:
                studyWriting();
                break;
            case 403:
                studyWriting2();
                break;
            case 501: // 500: 학습 끝
                endOfLearning();
                break;
            default:
        }
    }, [step]);
    
    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true, id: Date.now(), step: step }, // 사용자의 메시지
            // { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() },
        ]);
        userInputJudge();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSendMessage(message);
        setMessage('');
    };
    
    const addAiMessage = (aiSay, currStep=step) => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `${aiSay}`, isUser: false, id: Date.now(), step: currStep},
        ]);
    }
    
    const userInputJudge = async () => {
        if (step === 0 && message === word) setStep(101);
        else if (step === 101) correctJudge();
        else if (step === 102) {
            if (message === word) {
                setStep(201);
            }
            else {
                setStep(401);
            }
        }
        else if (step === 403) examineWriting();
    }

    const startQuiz = async () => {
        for (let i = 0; i < quiz.answers.length; i++) {
            if (quiz.answers[i].correct === true) {
                setCorrectAnswer(quiz.answers[i].answer);
            }
        }
        setAiIsTalking(true);
        addAiMessage(`다음은 "${word}"를 사용한 문장입니다.`);
        await delay();
        addAiMessage(`"${quiz.Sentence}"`);
        await delay();
        addAiMessage(`${quiz.question}\n\n다음 <보기> 중 가장 적절한 답안을 입력해 주세요. 정답 외 다른 입력은 모두 오답으로 처리됩니다.`);
        await delay();
        addAiMessage(`<보기>${quiz.answers.map((ele) => '\n- ' + ele.answer).join('')}`);
        setAiIsTalking(false);
    }

    const correctJudge = async () => {
        if (message === correctAnswer) {
            // 사용자가 원한다면 -> 학습 사이클 진행
            setStep(102);
        }
        else {
            // 오답이었음과 정답이 뭐였는지 공개한 후, 학습 사이클 진행
            setAiIsTalking(true);
            addAiMessage(`오답입니다!\n\n위 문장에서 단어 '${word}'는 '${correctAnswer}'라는 의미로 사용되었습니다.`);
            await delay();
            addAiMessage(`🥲`);
            await delay();
            addAiMessage(`퀴즈의 정답을 맞히지 못한 단어에 대해서는 쓰기/읽기 학습을 수행해야 합니다.`);
            await delay();
            setAiIsTalking(false);
            setStep(201);
        }
    }
    
    const guideToCorrect = async () => {
        setAiIsTalking(true);
        addAiMessage(`정답입니다!\n\n위 문장에서 단어 '${word}'는 '${correctAnswer}'라는 의미로 사용되었습니다.`);
        await delay();
        addAiMessage(`👍`);
        await delay();
        addAiMessage(`정답을 맞힌 퀴즈에 한해서 쓰기/읽기 학습을 건너뛸 수 있습니다.\n\n이대로 학습을 마치시겠습니까?`);
        await delay();
        addAiMessage(`학습을 마치지 않고 학습을 진행하시겠다면, '${word}'를 재입력해 주세요. 그 외 내용 입력 시 현재 단계에 대한 학습이 종료됩니다.`);
        setAiIsTalking(false);
    }

    const generateSentence = async () => {
        const formData = new FormData();
        formData.append('word', word);
        formData.append('meaning', correctAnswer);
        return await axios.post(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/sentence/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    const textToSpeech = async (text) => {
        const formData = new FormData();
        formData.append('text', text);
        return await axios.post(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/tts/', formData, {
            responseType: 'blob',
            headers: {
                'Authorization': `Token ${token}`,
            }
        });
    }

    const getRecentLearnedWords = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/study/writing/', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }
        
    const studyHandWriting = async () => {
        setAiIsTalking(true);
        addAiMessage(`학습은 (1)쓰기, (2)읽기 순서로 이루어 집니다.`);
        await delay();
        addAiMessage(`'쓰기' 과정을 진행합니다. 다음 주어지는 문장을 수기로 작성해 보시고, 사진을 업로드 해주세요.\n\n(※ 문장 생성에 5 ~ 10초가량 시간이 소요됩니다.)`);
        
        // generate Sentence And Provide TTS
        const response = generateSentence();
        if ((await response).status === 200) {
            setStudySentence((await response).data.sentence);
            const tmpSentence = (await response).data.sentence;

            // tts 요청
            const ttsResponse = textToSpeech(tmpSentence);
            if ((await ttsResponse).status === 200) {
                const tmpAudioBlob = new Blob([(await ttsResponse).data]);
                const tmpAudioUrl = URL.createObjectURL(tmpAudioBlob);
                setAudioUrl(tmpAudioUrl);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `📝 "${tmpSentence}"`, isUser: false, mode: 'tts', audioUrl: tmpAudioUrl, id: Date.now(), step: step },
                ]);
                URL.revokeObjectURL(tmpAudioBlob); // 리소스 해제
            }
        }
        setAiIsTalking(false);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'handwriting', id: Date.now(), step: step },
        ]);
    }

    const studyHandWriting2 = async () => {
        await delay();
        addAiMessage(`사진에서 해당 문장을 찾지 못했습니다. 재작성하거나 재촬영 후 재업로드 해주세요.`);
        setAiIsTalking(false);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `📝 "${studySentence}"`, isUser: false, mode: 'tts', audioUrl: audioUrl, id: Date.now(), step: step },
            { isUser: false, mode: 'handwriting', id: Date.now(), step: step - 1 },
        ]); // 사용자 편의를 위해 문장에 대한 내용 다시 노출
        setStep(200);
    }
    
    const studyReading = async () => {
        await delay();
        addAiMessage(`✅`);
        await delay();
        addAiMessage(`확인되었습니다. 훌륭하게 수행하셨군요!`);
        await delay();
        addAiMessage(`다음은 '읽기' 과정을 진행합니다. 다음 주어지는 문장을 소리 내어 읽어보세요.\n\n(※ 문장 생성에 5 ~ 10초가량 시간이 소요됩니다.)`);
        
        // generate Sentence And Provide TTS
        const response = generateSentence();
        if ((await response).status === 200) {
            setStudySentence((await response).data.sentence);
            const tmpSentence = (await response).data.sentence;

            // tts 요청
            const ttsResponse = textToSpeech(tmpSentence);
            if ((await ttsResponse).status === 200) {
                const tmpAudioBlob = new Blob([(await ttsResponse).data]);
                const tmpAudioUrl = URL.createObjectURL(tmpAudioBlob);
                setAudioUrl(tmpAudioUrl);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `🎙️ "${tmpSentence}"`, isUser: false, mode: 'tts', audioUrl: tmpAudioUrl, id: Date.now(), step: step },
                ]);
                URL.revokeObjectURL(tmpAudioBlob); // 리소스 해제
            }
        }
        setAiIsTalking(false);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'reading', id: Date.now(), step: step },
        ]);
    }

    const studyReading2 = async () => {
        await delay();
        addAiMessage(`음성에서 해당 문장을 인식하지 못했습니다. 재녹음 후 재업로드 해주세요.`);
        setAiIsTalking(false);

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: `🎙️ "${studySentence}"`, isUser: false, mode: 'tts', audioUrl: audioUrl, id: Date.now(), step: step },
            { isUser: false, mode: 'reading', id: Date.now(), step: step - 1 },
        ]); // 사용자 편의를 위해 문장에 대한 내용 다시 노출
        setStep(300);
    }
    
    const endOfReading = async () => {
        await delay();
        addAiMessage(`✅`);
        await delay();
        addAiMessage(`확인되었습니다. 훌륭하게 수행하셨군요!`);
        await delay();
        addAiMessage(`👏`);
        await delay();
        setAiIsTalking(false);
        setStep(401);
    }

    const isItTurnToWriting = async () => {
        // 사용자가 작문을 할 수 있는 조건이 되는 지 확인하기
        const response = await axios.get(process.env.REACT_APP_API_URL + '/study/writing/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        });
        if ((await response).status === 200) {
            addAiMessage(`잠시만요!`);
            await delay();
            addAiMessage(`${username} 님은 최근에 다섯 개 이상의 단어를 학습했고, 이제 '작문하기' 단계에 도전할 준비가 된 상태입니다.`);
            await delay();
            addAiMessage(`이어서 '작문하기'를 수행하시겠습니까?`);
            await delay();
            
            setMessages((prevMessages) => [
                ...prevMessages,
                { isUser: false, mode: 'areYouWantToWriting', id: Date.now(), step: step },
            ]);
        }
        else {
            setStep(501);
        }
    }

    const studyWriting = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `네, 작문하기를 시작합니다.`, isUser: true, id: Date.now(), step: step },
        ]);

        setAiIsTalking(true);
        addAiMessage(`'작문하기' 과정을 진행합니다.`);
        await delay();
        addAiMessage(`다음 주어지는 단어 목록은 '최근에 학습한 다섯 개의 단어' 목록입니다.\n\n다음 단어 중, '두 개 이상'의 단어를 선택하세요. 선택 완료 후, 선택한 단어를 이용해 '작문하기'를 수행하게 됩니다.`);
        const response = getRecentLearnedWords();
        if ((await response).status === 200) {
            const recentLearnedWords = (await response).data.quiz_words;
            setMessages((prevMessages) => [
                ...prevMessages,
                { isUser: false, mode: 'writing', recentLearnedWords: recentLearnedWords, id: Date.now(), step: step },
            ]);
        }
        setAiIsTalking(false);
    }
    
    const studyWriting2 = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `선택 완료`, isUser: true, id: Date.now(), step: step - 1 },
        ]);

        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`, step - 1);
        await delay();
        addAiMessage(`선택하신 단어는 다음과 같습니다.`, step - 1);
        await delay();
        addAiMessage(`${writingWords.map((ele, idx) => (idx + 1) +'. ' + ele.word + '\n').join('')}`, step - 1);
        await delay();
        addAiMessage(`이제, 위 단어를 이용해 자유롭게 문장을 작문해 주세요.\n\n하단의 입력창을 통해 문장을 제출하시면, 맞춤법 확인 및 교정이 이루어진 뒤 완전히 학습을 마치게 됩니다.`, step - 1);
        setAiIsTalking(false);
    }

    const examineWriting = async () => {
        var writingAnswer = false;

        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`, step - 1);

        var writingWordsId = [];
        for (var i = 0; i < writingWords.length; i++) {
            writingWordsId.push(parseInt(writingWords[i].id));
        }

        const formData = new FormData();
        formData.append('selected_words', JSON.stringify(writingWordsId));
        formData.append('composition_text', message);
        await axios.post(process.env.REACT_APP_API_URL + '/study/writing/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) {
                writingAnswer = response.data.composition_result.answer;
                addAiMessage(`${response.data.composition_result.text}`, step - 1);
                setAiIsTalking(false);
            }
        })
        .catch(error => {
            console.error(error);
        });
        
        if (writingAnswer) {
            setAiIsTalking(true);
            await delay();
            addAiMessage(`완벽합니다! 모든 학습의 수행을 완료하셨습니다.`, step - 1);
            await delay();
            setAiIsTalking(false);
            setStep(501);
        }
    }
    
    const endOfLearning = async () => {
        addAiMessage(`${Date()}, 학습을 종료합니다.`, step=-1);

        const jsonString = JSON.stringify([
            ...messages,
            { text: `${Date()}, 학습을 종료합니다.`, isUser: false, id: Date.now(), step: -1},
        ]);
        const today = dateToTimestamp(Date());
        const formData = new FormData();
        formData.append('chat_log', jsonString);
        formData.append('solved_date', today);
        const response = await axios.patch(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) console.log('solved date is updated.'); // console.log(JSON.parse(response.data.chat_log)); 테스트 해보니 잘 파싱 됨
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
                autoFocus
            />
            <button className="send-button" type="submit" disabled={message === ''}>
                <IoSend size={25} />
            </button>
        </form>
    );
};

export default MessageForm;