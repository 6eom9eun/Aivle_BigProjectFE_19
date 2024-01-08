import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, User, useDisclosure, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import UserProfile from "./UserProfile";

function Article() {
  const {postId} = useParams();
  const nav = useNavigate();
  const token = sessionStorage.getItem('aivle19_token')
  const loginUser = sessionStorage.getItem('aivle19_username')
  const [articleData, setArticleData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [writeComment, setWriteComment] = useState('')
  const onCommentHandler = (e) => {
    setWriteComment(e.currentTarget.value);
  };
  const [newComment, setNewComment] = useState('');
  const onNewCommentHandler = (e) => {
    setNewComment(e.currentTarget.value);
  };
  const [editing, setEditing] = useState({});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/board/${postId}/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
         })
            .then(response => {
                setArticleData(response.data);
            })
            .catch(error => {
                console.error("게시글 불러오기 실패", error);
            });

        axios.get(process.env.REACT_APP_API_URL + `/board/${postId}/comments/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
          })
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.error("댓글 불러오기 실패", error);
            });
    }, [postId]);

    const fetchComments = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/board/${postId}/comments/`, {
          headers: {
              'Authorization': `Token ${token}`
          }
        });
        setCommentData(response.data);
      } catch (error) {
          console.error("댓글 불러오기 실패", error);
      }
    }

    const onSubmitHandler = async (e) => {
      e.preventDefault()
      let req = {
          comment: writeComment,
      };

      try {
        const response = await axios.post(process.env.REACT_APP_API_URL + `/board/${postId}/comments/`, req, {
          headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
          }
        });
        console.log('write comment successful');
        setWriteComment('');
        fetchComments();
      } catch (error) {
          console.error('write comment error:', error);
      };
    }

    const onDeleteCommentHandler = async (postId, commentId) => {
      const url = process.env.REACT_APP_API_URL + `/board/${postId}/comments/${commentId}/`;
      try {
          const response = await axios.delete(url, {
            headers: {
              'Authorization': `Token ${token}`
          }
          });
          fetchComments();
      } catch (error) {
          console.error(error);
      }
    }

  // 각 댓글의 모달 상태를 관리하는 객체
  const [modalOpenStates, setModalOpenStates] = useState({});

  // 모달 열기 함수
  const openModal = (commentId) => {
    setModalOpenStates(prev => ({ ...prev, [commentId]: true }));
  };

  // 모달 닫기 함수
  const closeModal = (commentId) => {
    setModalOpenStates(prev => ({ ...prev, [commentId]: false }));
  };

  // 모달이 열려있는지 확인하는 함수
  const isModalOpen = (commentId) => {
    return modalOpenStates[commentId] || false;
  };

  const onUpdateSubmitHandler = async (postId, commentId) => {
    const url = process.env.REACT_APP_API_URL + `/board/${postId}/comments/${commentId}/`;
    let req = {
      comment: newComment,
    };
    try {
        const response = await axios.put(url, req, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setEditing({...editing, [commentId]: false})
        fetchComments();
    } catch (error) {
        console.error(error);
    }
  }

  const onDeleteArticleHandler = async (e) => {
    e.preventDefault()
    const url = process.env.REACT_APP_API_URL + `/board/${postId}/`;
    try {
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Token ${token}`
        }
        });
        nav('/board');
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
          <h1 style={{fontSize: "3em", fontWeight: 'bold'}}>{articleData.title}</h1>
        </div>
        <br />
        <Popover placement="right">
          <PopoverTrigger>
            <span className="user">{articleData.username}</span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <UserProfile userId={articleData.user_id} token={token}/>
            </div>
          </PopoverContent>
        </Popover>
        <span> · </span>
        <span>{new Date(articleData.created_at).toLocaleString()}</span>
        <div style={{ float: 'right' }}>
        {loginUser === articleData.username && (
          <>
          <span onClick={() => nav(`/board/${postId}/update`, { state: { title: articleData.title, content: articleData.content }})} className="user" style={{color: '#6B7270', paddingRight: '10px', fontSize: '0.9em'}}>수정</span>
          <>
          <span onClick={onOpen} className="user" style={{color: '#6B7270', fontSize: '0.9em'}}>삭제</span>
          <Modal style={{fontFamily:'JalnanGothic'}} isOpen={isOpen} onOpenChange={onOpenChange} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">게시물 삭제</ModalHeader>
                  <ModalBody>
                    <p> 
                      게시물을 삭제하시겠습니까?
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button className='rounded-md' color="danger" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                    <Button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onDeleteArticleHandler} 
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
          source={articleData.content} 
          style={{whiteSpace: 'pre-wrap'}}
        />
      </div>
      <hr />

      <div style={{paddingTop: '40px', paddingBottom: '60px'}}>
        <h1 style={{fontSize: "1.3em", fontWeight: 'bold', paddingBottom:'18px'}}>댓글</h1>
        <div className="w-full" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Textarea
            variant='bordered'
            radius="sm"
            value={writeComment}
            onChange={onCommentHandler}
            placeholder="댓글을 작성하세요"
          />
          <Button onClick={onSubmitHandler} color="secondary" auto style={{marginTop: '10px'}}>댓글 작성</Button>
        </div>
      </div>

      <div>
        {commentData.map((comment) => (
          <div key={comment.comment_id} style={{paddingBottom:'30px', position: 'relative'}}>
            <Popover placement="left">
              <PopoverTrigger>
                <User   
                  name={comment.username}
                  description={new Date(comment.created_at).toLocaleString()}
                  avatarProps= {{
                    src: process.env.REACT_APP_API_URL + comment.profile_image
                  }}
                  style={{ cursor: "pointer" }}
                />
                </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <UserProfile userId={comment.user_id} token={token}/>
                </div>
              </PopoverContent>
            </Popover>
          
          {editing[comment.comment_id] ? (
            <Textarea
              variant="bordered"
              value={newComment}
              onChange={onNewCommentHandler}
              className="max-w"
            />
          ) : (
            <Textarea
              isReadOnly
              variant="bordered"
              value={comment.comment}
              className="max-w"
            />
          )}

          <div style={{position: 'absolute', top: 25, right: 0, display: 'flex', fontSize:'small'}}>
          {comment.username === loginUser && (
            <>
              {editing[comment.comment_id] ? (
                <>
                  <span className="user" style={{color: '#6B7270', }} onClick={() => setEditing({...editing, [comment.comment_id]: false})}>취소</span>
                  <span className="user" style={{color: '#6B7270', paddingLeft:'10px'}} onClick={() => onUpdateSubmitHandler(postId, comment.comment_id)}>수정</span>  
                </>
              ) : (
                <span className="user" style={{color: '#6B7270'}} onClick={() => {setNewComment(comment.comment); setEditing({...editing, [comment.comment_id]: true})}}>수정</span>
              )}
              <span onClick={() => openModal(comment.comment_id)} className="user" style={{color: '#6B7270', paddingRight:'10px', paddingLeft:'10px'}}>삭제</span>  
              <Modal style={{fontFamily:'JalnanGothic'}} isOpen={isModalOpen(comment.comment_id)} onOpenChange={() => closeModal(comment.comment_id)} backdrop="Transparent">
                  <ModalContent>
                      {(onClose) => (
                      <>
                          <ModalHeader className="flex flex-col gap-1">댓글 삭제</ModalHeader>
                          <ModalBody>
                          <p> 
                              댓글을 삭제하시겠습니까?
                          </p>
                          </ModalBody>
                          <ModalFooter>
                              <Button className='rounded-md' color="danger" variant="light" onPress={onClose}>
                                  닫기
                              </Button>
                              <Button 
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => onDeleteCommentHandler(postId, comment.comment_id)} 
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
          )}
          </div>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Article