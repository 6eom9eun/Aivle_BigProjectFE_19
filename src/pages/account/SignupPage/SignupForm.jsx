import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignupForm() {

    const [LastName, setLastName] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [Email, setEmail] = useState("")
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    const [CheckPassword, setCheckPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const nav = useNavigate();
    const [errors, setErrors] = useState({})

    const onFirstNameHandler = (e) => {
        setFirstName(e.currentTarget.value)
    }

    const onLastNameHandler = (e) => {
        setLastName(e.currentTarget.value)
    }

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onIdHandler = (e) => {
        setId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)

        setPasswordsMatch(e.target.value === CheckPassword);
    }

    const onCheckPasswordHandler = (e) => {
        setCheckPassword(e.currentTarget.value);
        // 비밀번호 확인이 변경될 때마다 일치 여부를 다시 확인
        setPasswordsMatch(e.currentTarget.value === Password);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let req = {
            last_name: LastName,
            first_name: FirstName,
            email: Email,
            username: Id,
            password: Password,
        };


        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + '/accounts/signup/', req, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
            console.log('회원가입 성공');
            nav('/login')
        } catch (error) {
            console.error('회원가입 실패:', error);
            setErrors(error.response.data);
      };
    }
    return (
        <div style={{ 
            alignItems: 'center', justifyContent: 'center', 
            display:'flex', flexDirection:'column'}}
            className='lg:w-[50%] w-full p-2'>
            <div>
            <span className='font-semibold'>회원가입</span>
            </div>    
            
            <form class="w-full max-w-lg m-10">
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    이름
                </label>
                <input value={FirstName} onChange={onFirstNameHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="이름" />
                {errors.last_name && <small style={{color: 'red'}}>{errors.last_name}</small>}
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    성
                </label>
                <input value={LastName} onChange={onLastNameHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="성" />
                {errors.first_name && <small style={{color: 'red'}}>{errors.first_name}</small>}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                    이메일 주소
                </label>
                <input value={Email} onChange={onEmailHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="your@example.com" />
                {errors.email && <small style={{color: 'red'}}>{errors.email}</small>}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-id">
                    아이디
                </label>
                <input value={Id} onChange={onIdHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" type="text" placeholder="ID" />
                {errors.username && <small style={{color: 'red'}}>{errors.username}</small>}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    비밀번호
                </label>
                <input value={Password} onChange={onPasswordHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                {errors.password && <small style={{color: 'red'}}>{errors.password.password || errors.password}</small>}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    비밀번호 확인
                </label>
                <input value={CheckPassword} onChange={onCheckPasswordHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                {!passwordsMatch && <small style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</small>}
                </div>
            </div>
            <button onClick={onSubmitHandler} disabled={!passwordsMatch} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white'>
                회원가입
            </button> 
            </form>

        </div>
    )
}

export default SignupForm