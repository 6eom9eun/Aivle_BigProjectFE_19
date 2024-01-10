import React, { useState } from 'react';
import SignupForm from './SignupForm';
import Description from '../LoginPage/Description';
import TermsOfUseForm from './TermsOfUseForm';
import './style.css';

function SignupPage() {
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div className='pt-[63px] min-h-screen h-fit'>
      <section style={{ width: '100%', minHeight: 'calc(100vh - 63px)', height: 'fit-content', display: 'flex', flexDirection: 'column', fontFamily: 'JalnanGothic' }}>
        <div style={{ flex: '1', display: 'flex' }}>
          <Description />
          {showSignupForm ? (
            <SignupForm />
          ) : (
            <TermsOfUseForm setShowSignupForm={setShowSignupForm} />
          )}
        </div>
      </section>
    </div>
  );
} 

export default SignupPage;