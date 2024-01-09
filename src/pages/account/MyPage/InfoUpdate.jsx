import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar2 from '../../../components/SideBar2';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";


function InfoUpdate() {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem('aivle19_token')

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/accounts/user/', {
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

  
  const [Firstname, setFirstname] = useState(userData !== null ? userData.user.First_name : '');
  const [FirstnameInitial, setFirstnameInitial] = useState(true);
  const [Lastname, setLastname] = useState(userData !== null ? userData.user.last_name : '');
  const [LastnameInitial, setLastnameInitial] = useState(true);
  const [Email, setEmail] = useState(userData !== null ? userData.user.email : '');
  const [EmailInitial, setEmailInitial] = useState(true);
  const [NewPassword, setNewPassword] = useState("");
  const [OldPassword, setOldPassword] = useState("");

  const nav = useNavigate();

  const onFirstnameHandler = (e) => {
      setFirstname(e.currentTarget.value)
      setFirstnameInitial(false);
  }

  const onLastnameHandler = (e) => {
    setLastname(e.currentTarget.value)
    setLastnameInitial(false);
  }

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
    setEmailInitial(false);
  }

  const onNewPasswordHandler = (e) => {
      setNewPassword(e.currentTarget.value)
  }

  const onOldPasswordHandler = (e) => {
    setOldPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
      e.preventDefault()

      const url = process.env.REACT_APP_API_URL + "/accounts/user/update/";
      const req = {
          'last_name': LastnameInitial ? userData?.user.last_name : Lastname,
          'first_name': FirstnameInitial ? userData?.user.first_name : Firstname,
          'email': EmailInitial ? userData?.user.email : Email,
          'password': NewPassword,
          'old_password': OldPassword
      };

      axios.put(url, req, {
        headers: {
          "Authorization": `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
          .then(res => {
              console.log("200 OK");
              nav('/myinfo');
          }).catch(err => {
              // 에러 처리
              console.log(err.response.data.message);
              alert("현재 비밀번호를 확인해 주세요.")
          });
    };
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Sidebar2 />
      <div className='pt-[63px] min-h-screen' style={{padding:'63px', marginLeft:'256px', fontFamily: 'JalnanGothic'}}>
      <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12"></div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">개인정보 수정</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
              <div className="mt-2">
                <Input
                  type="text"
                  label="이름"
                  variant='bordered'
                  value={(FirstnameInitial && userData !== null) ? userData.user.first_name : Firstname}
                  onChange={onFirstnameHandler}
                  className="flex w-full flex-wrap md:flex-nowrap gap-4"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-2">
                <Input
                  type="text"
                  label="성"
                  variant='bordered'
                  value={(LastnameInitial && userData !== null) ? userData.user.last_name : Lastname}
                  onChange={onLastnameHandler}
                  className="flex w-full flex-wrap md:flex-nowrap gap-4"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  type="email"
                  label="이메일 주소"
                  variant='bordered'
                  value={(EmailInitial && userData !== null) ? userData.user.email : Email}
                  onChange={onEmailHandler}
                  className="flex w-full flex-wrap md:flex-nowrap gap-4"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  type="password"
                  label="새로운 비밀번호"
                  variant='bordered'
                  value={NewPassword}
                  onChange={onNewPasswordHandler}
                  className="flex w-full flex-wrap md:flex-nowrap gap-4"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="mt-2">
                <Input
                  type="password"
                  label="현재 비밀번호"
                  variant='bordered'
                  value={OldPassword}
                  onChange={onOldPasswordHandler}
                  className="flex w-full flex-wrap md:flex-nowrap gap-4"
                />
              </div>
            </div>

          </div>
        </div>

        </div>

      <div className="mt-3 flex items-center justify-end gap-x-2">
        <Button onClick={() => nav('/myinfo')} type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900">
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
              <ModalHeader className="flex flex-col gap-1">회원 정보 수정</ModalHeader>
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

export default InfoUpdate