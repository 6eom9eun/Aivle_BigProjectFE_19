import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardHeader, CardBody, Image, Textarea} from "@nextui-org/react";
import Sidebar2 from '../../../components/SideBar2';


function Profile() {
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

  return (
    <div>
        <Sidebar2 />
        <div className='pt-[63px] min-h-screen' style={{fontFamily:'JalnanGothic', padding:'63px', marginLeft:'256px', marginBottom:'200px', display: 'flex', justifyContent: 'center', position: 'relative', top: '145px'}}>
            <Card className="py-4" style={{ width: '300px', height: '460px'}}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Level. {userData !== null ? userData.profile.user_level : 'Loading...'}</p>
                <br />
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={userData !== null ? userData.profile.image : 'Loading...'}
                    width={270}
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Textarea
                        isReadOnly
                        variant="bordered"
                        labelPlacement="outside"
                        // defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                        value={userData !== null ? userData.profile.introduction : 'Loading...'}
                        className="max-w-xs"
                        />
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Profile