import React, { useEffect } from 'react';
import { MessageItem } from './';
import axios from 'axios';
import Typing from 'react-kr-typing-anim';

const MessageList = ({ token, quizId, studySentence,
    messages, setMessages, scrollRef, step, setStep, setAiIsTalking, writingWords, setWritingWords }) => {
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        if ((step !== -1) && (step !== 501)) updateChatLog();
    }, [messages]);

    const updateChatLog = () => {
        const jsonString = JSON.stringify(messages);
        const formData = new FormData();
        formData.append('chat_log', jsonString);
        axios.patch(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) console.log('chat log is updated.'); // console.log(JSON.parse(response.data.chat_log)); 테스트 해보니 잘 파싱 됨
        })
        .catch(error => {
            console.error(error);
        });
    }

    const judgeChatStyle = (message) => {
        if (message.mode === 'reEnter') return 'guide-re-enter';
        else {
            if (message.isUser) return 'user-message';
            else return 'ai-message';
        }
    }

    return (
        <div className="messages-list">
            {messages.map((message) =>
                <div className={`message ${judgeChatStyle(message)}`}>
                    <MessageItem
                        message={message} setMessages={setMessages} quizId={quizId}
                        studySentence={studySentence}
                        step={step} setStep={setStep}
                        setAiIsTalking={setAiIsTalking} writingWords={writingWords} setWritingWords={setWritingWords} />
                    <div className='relative -bottom-5' ref={scrollRef}></div>
                </div>
            )}
        </div>
    );
};

export default MessageList;