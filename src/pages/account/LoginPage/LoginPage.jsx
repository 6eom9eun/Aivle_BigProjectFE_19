import React from 'react'
import LoginForm from './LoginForm'
import Description from './Description'


function LoginPage({setIsLogin}) {
  return (
    <div className='pt-[63px] min-h-screen'>
        <section style={{ width: '100%', height: 'calc(100vh - 63px)', display: 'flex', flexDirection: 'column', fontFamily:'JalnanGothic' }} >

            <div className='flex flex-1'>
                <Description />
                <LoginForm setIsLogin={setIsLogin} />
            </div>
        </section>
    </div>
  )
}

export default LoginPage