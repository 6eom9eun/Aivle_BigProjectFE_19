import React, {useState} from 'react'
import termsOfUseData from '../pages/account/SignupPage/termsOfUseData.json'
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";


function TouModal() {
  const [termsOfUse, setTermsOfUse] = useState(termsOfUseData);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


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
    <>
      <span onClick={onOpen} style={{cursor: 'pointer'}}>이용약관</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} className='modal'>
        <ModalContent className='modal-content max-h-[90%] max-w-full w-full overflow-y-auto'>
          {(onClose) => (
            <>
              <ModalBody style={{ maxHeight: "90vh", overflowY: "auto", fontFamily: 'JalnanGothic'}}>
                <Table termsOfUse={termsOfUse} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default TouModal