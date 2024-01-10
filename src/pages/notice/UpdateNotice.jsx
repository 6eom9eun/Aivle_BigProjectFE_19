import React, { useState } from 'react';
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import rehypeSanitize from "rehype-sanitize";

function UpdateNotice() {
  const token = sessionStorage.getItem('aivle19_token');
  const {noticeId} = useParams();
  const location = useLocation();
  const [title, setTitle] = useState(location.state !== null ? location.state.title : '');
  const [content, setContent] = useState(location.state !== null ? location.state.content : '');
  const { isOpen: isCancelOpen, onOpen: onOpenCancel, onOpenChange: onOpenChangeCancel } = useDisclosure();
  const { isOpen: isSaveOpen, onOpen: onOpenSave, onOpenChange: onOpenChangeSave } = useDisclosure();
  const nav = useNavigate();

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onContentHandler = (value) => {
    setContent(value);
  };

  const onDropHandler = async (files) => {
    const formData = new FormData();
    formData.append('image', files[0]);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/board/image-upload/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.image_url;

      const newContent = `${content}![Alt text](${process.env.REACT_APP_API_URL + imageUrl})`;
      setContent(newContent);
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let req = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.put(process.env.REACT_APP_API_URL + `/notice/${noticeId}/`, req, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('update notice successful');
      nav(`/notice/${noticeId}`);
    } catch (error) {
      console.error('udpate notice error:', error);
    }
  };

  const onCancelHandler = () => {
    nav(`/notice/${noticeId}`);
  };

  return (
    <div data-color-mode="light" style={{ padding: '20px', fontFamily:'JalnanGothic' }}>
      <div className="w-1/2 flex flex-col gap-4" style={{ paddingBottom: '50px' }}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            value={title}
            onChange={onTitleHandler}
            style={{ fontSize: '35px' }}
            type="text"
            variant="underlined"
            placeholder="제목을 입력하세요"
          />
        </div>
      </div>

      <div onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          onDropHandler(files);
        }
      }}>
        <MDEditor
          height="60vh"
          value={content}
          onChange={onContentHandler}
          style={{ whiteSpace: 'pre-wrap' }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }} 
          onDrop={(files) => onDropHandler(files)}
        />
      </div>

      <div className="flex flex-wrap gap-4 pt-5 justify-end">
        <>
          <Button onPress={onOpenCancel} type="button" color="secondary" variant="light">
            취소
          </Button>
          <Modal style={{fontFamily:'JalnanGothic'}} isOpen={isCancelOpen} onOpenChange={onOpenChangeCancel} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">공지 수정 취소</ModalHeader>
                  <ModalBody>
                    <p>공지 수정을 취소하시겠습니까?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button className="rounded-md" color="danger" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                    <Button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="button"
                      onPress={() => onCancelHandler()}
                      onClick={onClose}
                    >
                      작성 취소
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
        <>
          <Button onPress={onOpenSave} type="button" color="secondary">
            저장
          </Button>
          <Modal style={{fontFamily:'JalnanGothic'}} isOpen={isSaveOpen} onOpenChange={onOpenChangeSave} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">공지 수정</ModalHeader>
                  <ModalBody>
                    <p>변경된 내용을 저장하시겠습니까?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button className="rounded-md" color="danger" variant="light" onPress={onClose}>
                      닫기
                    </Button>
                    <Button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={onSubmitHandler}
                      type="submit"
                      onPress={onClose}
                    >
                      저장
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default UpdateNotice;
