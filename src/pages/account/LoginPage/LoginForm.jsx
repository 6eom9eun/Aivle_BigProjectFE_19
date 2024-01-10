import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleSymbol from '../../../assets/socialSymbol/GoogleSymbol.png';
import SocialKakao from './SocialKakao';
import SocialNaver from './SocialNaver';

function LoginForm({setIsLogin}) {

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const nav = useNavigate();

    const onIdHandler = (e) => {
        setId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const url = process.env.REACT_APP_API_URL + "/accounts/login/";
        const req = {
            'username': Id,
            'password': Password,
        };
        const config = {"Content-Type": 'application/json'};

        axios.post(url, req, config)
            .then(res => {
                console.log("Login success");
                sessionStorage.setItem('aivle19_username', req.username);
                sessionStorage.setItem('aivle19_token', res.data.token);
                setIsLogin(true);
                nav('/');
            }).catch(err => {
                // 에러 처리
                console.log(err.response.data.message);
                alert("아이디 또는 비밀번호를 확인해 주세요.")
            });
      };

    return (
        <div style={{ 
            alignItems: 'center', justifyContent: 'center', 
            display:'flex', flexDirection:'column', fontFamily:'JalnanGothic'}}
            className='lg:w-[50%] w-full p-2'>
            
            <h3 className="font-semibold">환영합니다!</h3>
            <h3 className="font-semibold">귀하의 계정에 로그인하십시오</h3>
            
            <form style={{ display:'flex', flexDirection:'column' }} className="w-full max-w-sm font-semibold">
              <div className="w-full">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='grid-id'>
                아이디
                </label>
                <input value={Id} onChange={onIdHandler} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" type="text" placeholder="Your ID" />

              </div>
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  비밀번호
                  </label>
                  <input value={Password} onChange={onPasswordHandler} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
                <br />
                <button onClick={onSubmitHandler} className='p-2 rounded-xl text-white font-semibold bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white' >
                    로그인
                </button>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}

                <div className='m-auto mt-2 flex align-middle font-normal'>
                    <span style={{color:'grey'}}>아직 계정이 없으신가요?</span>
                    <a href={process.env.PUBLIC_URL+"/signup"} className='ml-2 hover:text-[black] text-blue-600 visited:text-purple-600 ...'>회원가입</a>
                </div>
                <div className='w-full mt-8'>
                    <SocialKakao />
                    <SocialNaver />
                </div>
            </form>
        </div>
    )
}

export default LoginForm