import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NaverRedirection({setIsLogin}) {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const state = new URL(document.location.toString()).searchParams.get('state');
    const nav = useNavigate();

    useEffect(() => {
        const config = {"Content-Type": 'application/json'};
        
        axios.get(process.env.REACT_APP_API_URL + `/accounts/naver/callback/?code=${code}&state=${state}`, config
        )
            .then((res) => {
                sessionStorage.setItem('aivle19_username', res.data.user.username);
                sessionStorage.setItem('aivle19_token', res.data.token);
                setIsLogin(true);
                nav('/');
            }).catch(err => {
                if(err.response) {
                    console.error(err.response.data.message);
                } else {
                    console.error(err.message);
                }
            })
    }, []);
  
    return (
        <div className='pt-[63px] h-screen m-auto flex justify-center items-center text-3xl' style={{fontFamily: 'JalnanGothic'}}>
            로그인 중입니다..
        </div>
    );

  };

export default NaverRedirection