import { ReactComponent as KakaoLoginSymbol } from '../../../assets/socialSymbol/KakaoSymbol.svg';


const SocialKakao = ()=>
{
    const Rest_api_key = process.env.REACT_APP_KAKAO_KEY
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URL
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return(
    <>
    <button onClick={handleLogin} type='button' className='w-full mt-2 grid grid-cols-[10%_90%] place-items-center p-2 text-black/[0.85] bg-[#FEE500] rounded-xl border border-[#FEE500] hover:text-[#FEE500] hover:bg-white'>
        <KakaoLoginSymbol width={25} fill='#000000' />
        <div className='font-normal'>카카오 계정으로 로그인</div>
    </button>
    </>
    )
}
export default SocialKakao