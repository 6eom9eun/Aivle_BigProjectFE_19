import React from "react";
import NaverSymbol from "../../../assets/socialSymbol/NaverSymbol.png";

const SocialNaver = ()=>
{
    const Rest_api_key = process.env.REACT_APP_NAVER_KEY
    const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URL
    const state = process.env.REACT_APP_NAVER_STATE
    // oauth 요청 URL
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&state=${state}`;
    const handleLogin = ()=>{
        window.location.href = naverURL;
    }
    return(
    <>
    <button onClick={handleLogin} type='button' className='w-full mt-2 grid grid-cols-[10%_90%] place-items-center p-2 text-white/[0.85] bg-[#03C75A] rounded-xl border border-[#03C75A] hover:text-[#03C75A] hover:bg-white'>       
        <img width={25} src={NaverSymbol} />
        <div className="font-normal">네이버 계정으로 로그인</div>
    </button>
    </>
    )
}

export default SocialNaver;
