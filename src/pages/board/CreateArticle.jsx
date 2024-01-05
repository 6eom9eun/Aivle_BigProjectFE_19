import React, { useState } from 'react';
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import rehypeSanitize from "rehype-sanitize";

function CreateArticle() {
  const token = sessionStorage.getItem('aivle19_token');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      const response = await axios.post('YOUR_UPLOAD_API_ENDPOINT', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = response.data.url; // Assuming your API returns the URL of the uploaded image

      // Append the image URL to the content
      const newContent = `${content}![Alt text](${imageUrl})`;
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
      const response = await axios.post('http://127.0.0.1:8000/board/', req, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('create article successful');
      nav('/board');
    } catch (error) {
      console.error('create article error:', error);
    }
  };

  const onCancelHandler = () => {
    nav('/board');
  };

  return (
    <div data-color-mode="light" style={{ padding: '83px' }}>
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

      <div
        style={{ paddingTop: '17px', paddingLeft: '455px' }}
        className="flex flex-wrap gap-4 items-right"
      >
        <>
          <Button onPress={onOpenCancel} type="button" color="secondary" variant="light">
            취소
          </Button>
          <Modal isOpen={isCancelOpen} onOpenChange={onOpenChangeCancel} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">글 작성 취소</ModalHeader>
                  <ModalBody>
                    <p>글 작성을 취소하시겠습니까?</p>
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
          <Modal isOpen={isSaveOpen} onOpenChange={onOpenChangeSave} backdrop="Transparent">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">글 작성</ModalHeader>
                  <ModalBody>
                    <p>작성한 내용을 저장하시겠습니까?</p>
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

export default CreateArticle;
