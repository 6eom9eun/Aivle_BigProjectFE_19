import React, { useState } from 'react';
import TermsDetails from './Terms';
import termsOfUseData from './termsOfUseData.json';

const TermsOfUseForm = ({setShowSignupForm}) => {
  const [agreedToTerms1, setAgreedToTerms1] = useState(false);
  const [agreedToTerms2, setAgreedToTerms2] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [confirmation1, setConfirmation1] = useState(false);
  const [confirmation2, setConfirmation2] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(termsOfUseData);

  const handleAgreeToTerms = (setAgreed, setShowModal, setConfirmation) => {
    setAgreed((prevAgreed) => !prevAgreed);
    setShowModal(false);
    setConfirmation((prevConfirmation) => !prevConfirmation);
  }; 

  const handleModalClick1 = (e) => {
    if (e.target.className === 'modal') {
      handleHideModal1();
    }
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };
  const handleHideModal1 = () => {
    setShowModal1(false);
  };
  const handleAgreeToTerms1 = () => {
    handleAgreeToTerms(setAgreedToTerms1, setShowModal1, setConfirmation1);
  };

  const handleModalClick2 = (e) => {
    if (e.target.className === 'modal') {
      handleHideModal2();
    }
  };
  const handleShowModal2 = () => {
    setShowModal2(true);
  };
  const handleHideModal2 = () => {
    setShowModal2(false);
  };
  const handleAgreeToTerms2 = () => {
    handleAgreeToTerms(setAgreedToTerms2, setShowModal2, setConfirmation2);
  };

  const handleAgreeAll = () => {
    if (!allAgreed) {
      setAgreedToTerms1(true);
      setAgreedToTerms2(true);
      setAllAgreed(true);
    } else {
      setAgreedToTerms1(false);
      setAgreedToTerms2(false);
      setAllAgreed(false);
    }
  };

  const handleNextButtonClick = () => {
    if (agreedToTerms1 && agreedToTerms2) {
      setShowSignupForm(true);
    }
  };

  const Table = ({ termsOfUse }) => {
    return (
      <table className='terms-table'>
        <thead>
          <tr>
            <th className='text-center'>목적</th> 
            <th className='text-center'>항목</th>
            <th className='text-center'>보유기간</th>
          </tr>
        </thead>
        <tbody>
          {termsOfUse.map((item, index) => (
            <tr key={index}>
              <td className='text-justify'>{item.목적}</td>
              <td className='text-justify'>{item.항목}</td>
              <td className='text-justify'>{item.보유기간}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

    return (
      <div style={{ 
        alignItems: 'center', justifyContent: 'center', 
        display: 'flex', flexDirection: 'column'}}
        className='terms-check lg:w-[50%] w-full p-2'>
          <div className='lg:w-[400px] w-full grid grid-rows-5 grid-flow-col lg:gap-4 gap-2 items-center'>
            <h1 className='font-bold text-center'>LiQuest 서비스 약관에 동의해 주세요</h1>
            <div className="flex flex-wrap ">
              <button onClick={handleAgreeAll} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white'>
                {allAgreed ? '전체 동의 해제' : '모두 동의'}
              </button>
            </div>
            <div className="items-center grid grid-cols-[12%_88%]">
              <input type="checkbox" checked={agreedToTerms1} onChange={handleAgreeToTerms1} />
              <button onClick={handleShowModal1} className={`py-2 px-3 rounded-md text-white font-semibold 
                ${agreedToTerms1 ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white transition ease-in-out duration-300' : 'bg-gray-400 hover:bg-[var(--color-primary-500)]'}`}>
                LiQuest 이용약관 (필수)
              </button>
            </div>
            {showModal1 && (
              <div className="modal" onClick={handleModalClick1}>
                <div className="modal-content max-h-[70%] lg:w-[80%] w-full overflow-y-auto">
                  <TermsDetails />
                  <div style={{ display : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <label className='mt-4'>
                      <input type="checkbox" checked={agreedToTerms1} onChange={handleAgreeToTerms1} />
                      {!confirmation1 ? '동의 하시겠습니까?' : '동의 하셨습니다.'}
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="items-center grid grid-cols-[12%_88%]">
              <input type="checkbox" checked={agreedToTerms2} onChange={handleAgreeToTerms2} />
              <button onClick={handleShowModal2} className={`py-2 px-3 rounded-md text-white font-semibold 
                ${agreedToTerms2 ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white transition ease-in-out duration-300' : 'bg-gray-400 hover:bg-[var(--color-primary-500)]'}`}>
                개인정보 수집 및 이용 동의 (필수)  
              </button>
            </div>
            {showModal2 && (
              <div className="modal" onClick={handleModalClick2}>
                <div className="modal-content max-h-[70%] lg:w-[80%] w-full overflow-y-auto">
                  <Table termsOfUse={termsOfUse} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><br/>
                    <label className='mt-4'>
                      <input type="checkbox" checked={agreedToTerms2} onChange={handleAgreeToTerms2} />
                      {!confirmation2 ? '동의 하시겠습니까?' : '동의 하셨습니다.'}
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-wrap">
              <button
                onClick={handleNextButtonClick}
                className={`w-full py-2 px-3 rounded-md text-white font-semibold 
                  ${agreedToTerms1 && agreedToTerms2 
                    ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white transition ease-in-out duration-300' 
                    : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!agreedToTerms1 || !agreedToTerms2}
              >
                다음
              </button>
            </div>
          </div>
      </div>
    );
  }

  export default TermsOfUseForm;