import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../../../components/SideBar2'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


function ProfileUpdate() {
    const [userData, setUserData] = useState(null);
    const token = sessionStorage.getItem('aivle19_token')
  
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/accounts/profile/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data) setUserData(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const nav = useNavigate();
    const [Image, setImage] = useState(null);
    const [fileName, setFileName] = useState('')
    const [About, setAbout] = useState(userData !== null ? userData.profile.introduction : '');
    const [AboutInitial, setAboutInitial] = useState(true);

    const onImageHandler = (e) => {
        const Image = e.currentTarget.files[0]
        const imageUrl = URL.createObjectURL(Image);
        setImage(imageUrl);

        const file = e.currentTarget.files[0];
        setFileName(file.name);
        setImage(file);
    };

    const removeImageHandler = (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("file-upload");
        fileInput.value = "";
        setImage(null);
        setFileName('');
    }

    const onAboutHandler = (e) => {
        setAbout(e.currentTarget.value);
        setAboutInitial(false);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        const url = process.env.REACT_APP_API_URL + "/accounts/profile/update/";
        const formData = new FormData();
        formData.append('introduction', AboutInitial ? userData?.profile.introduction : About);
        if(Image !== null) {
            formData.append('image', Image);
        }

        axios
            .put(url, formData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response) => {
                console.log('프로필 수정 성공:', response.data);
                nav('/profile')
            })
            .catch((error) => {
                console.error('프로필 수정 성공:', error);
            });

        }

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
  return (
    <div>
        <Sidebar2 />
        <div className='pt-[63px] min-h-screen' style={{padding:'63px', marginLeft:'256px', fontFamily:'JalnanGothic'}}>
            <form encType='multipart/form-data'>
                <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12"></div>
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">프로필 수정</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            소개
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={(AboutInitial && userData !== null) ? userData.profile.introduction : About}
                            onChange={onAboutHandler}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">한 줄 소개를 작성해보세요!</p>
                        </div>


                        <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            프로필 사진
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>업로드 이미지 파일</span>
                                <input onChange={onImageHandler} accept='image/*' id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <label htmlFor="file-upload" className="text-sm leading-6 text-gray-600">
                        {fileName ? (
                            <div>
                                {fileName}
                                <button style={{color: 'red', paddingLeft: '5px'}} onClick={removeImageHandler}>❌</button>
                            </div>
                            ) : (
                                ""
                        )}
                    </label>
                    </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-x-2">
                        <Button onClick={() => nav('/profile')} type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900">
                        취소
                        </Button>
                        <>
                        <Button
                        type='button'
                        onPress={onOpen}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        수정
                        </Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} style={{fontFamily: 'JalnanGothic'}}>
                            <ModalContent>
                                {(onClose) => (
                            <>
                                    <ModalHeader className="flex flex-col gap-1">프로필 수정</ModalHeader>
                                    <ModalBody>
                                    <p> 
                                        변경된 내용을 저장하시겠습니까?
                                    </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className='rounded-md' color="danger" variant="light" onPress={onClose}>
                                            닫기
                                        </Button>
                                        <Button 
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={onSubmitHandler} 
                                        type='submit' 
                                        onPress={onClose}>
                                            저장
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                            </ModalContent>
                        </Modal>
                    </>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileUpdate