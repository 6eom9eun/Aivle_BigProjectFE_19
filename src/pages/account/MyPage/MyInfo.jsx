import React, { useState, useEffect } from 'react';
import {Card, CardBody} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import axios from 'axios';
import Sidebar2 from '../../../components/SideBar2';

function MyInfo() {
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

  return (
    <div>
        <Sidebar2 />
        <div className='pt-[63px] min-h-screen' style={{fontFamily:'JalnanGothic', padding:'63px', marginLeft:'256px', marginBottom:'200px', display: 'flex', justifyContent: 'center', position: 'relative', top: '145px'}}>
            <Card className="py-4" style={{ width: '520px', height: '430px'}}>
                <CardBody className="overflow-visible py-2">
                    <Input
                        isReadOnly
                        type="text"
                        label="이름"
                        variant="bordered"
                        value={userData !== null ? `${userData.user.last_name}${userData.user.first_name}` : 'Loading...'}
                        className="max-w-s"
                        />
                    <br />
                    <Input
                        isReadOnly
                        type="text"
                        label="아이디"
                        variant="bordered"
                        value={userData !== null ? `${userData.user.username}` : 'Loading...'}
                        className="max-w-s"
                        />
                    <br />
                    <Input
                        isReadOnly
                        type="email"
                        label="이메일 주소"
                        variant="bordered"
                        value={userData !== null ? `${userData.user.email}` : 'Loading...'}
                        className="max-w-s"
                        />
                    <br />
                    <Input
                        isReadOnly
                        type="text"
                        label="최근 로그인"
                        variant="bordered"
                        value={userData !== null ? new Date(userData.user.last_login).toLocaleString() : 'Loading...'}
                        className="max-w-s"
                        />
                    <br />
                    <Input
                        isReadOnly
                        type="text"
                        label="가입일"
                        variant="bordered"
                        value={userData !== null ? new Date(userData.user.date_joined).toLocaleString() : 'Loading...'}
                        className="max-w-s"
                        />
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default MyInfo