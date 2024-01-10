import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';

function NoticeDetail() {
  const {noticeId} = useParams();
  const nav = useNavigate();
  const token = sessionStorage.getItem('aivle19_token')
  const loginUser = sessionStorage.getItem('aivle19_username')
  const [noticeData, setNoticeData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/notice/${noticeId}/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
         })
            .then(response => {
                console.log("공지글 불러오기 성공", response.data)
                setNoticeData(response.data);
            })
            .catch(error => {
                console.error("공지 불러오기 실패", error);
            });
    }, []);

  const onDeleteNoticeHandler = async (e) => {
    e.preventDefault()
    const url = process.env.REACT_APP_API_URL + `/notice/${noticeId}/`;
    try {
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Token ${token}`
        }
        });
        nav('/notice');
    } catch (error) {
        console.error(error);
    }
  }
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <div data-color-mode="light" style={{fontFamily: 'JalnanGothic'}}
      className="lg:px-40 lg:py-10 p-4 m-auto">
      <div>
        <div>
          <h1 style={{fontSize: "3em", fontWeight: 'bold'}}>{noticeData.title}</h1>
        </div>
        <br />
        <span>{new Date(noticeData.created_at).toLocaleString()}</span>
        <div style={{ float: 'right' }}>
        {loginUser === 'admin' && (
          <>
          <span onClick={() => nav(`/notice/${noticeId}/update`, { state: { title: noticeData.title, content: noticeData.content }})} className="user" style={{color: '#6B7270', paddingRight: '10px', fontSize: '0.9em'}}>수정</span>
          <>
          <span onClick={onOpen} className="user" style={{color: '#6B7270', fontSize: '0.9em'}}>삭제</span>
          <Modal style={{fontFamily:'JalnanGothic'}} isOpen={isOpen} onOpenChange={onOpenChange} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">공지 삭제</ModalHeader>
                  <ModalBody>
                    <p> 
                      공지 글을 삭제하시겠습니까?
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button className='rounded-md' color="danger" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                    <Button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onDeleteNoticeHandler} 
                    type='submit' 
                    onPress={onClose}>
                      삭제
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
      </Modal>
      </>
          </>
        )}
        </div>
      </div>

      <div style={{padding: '55px 0'}}>
        <MDEditor.Markdown 
          source={noticeData.content} 
          style={{whiteSpace: 'pre-wrap'}}
        />
      </div>

      <hr />
    <div className="flex justify-end">
        <Button onClick={() => nav('/notice')} color="secondary" auto style={{marginTop: '10px'}}>공지 목록</Button>
    </div>
    </div>
  )
}

export default NoticeDetail