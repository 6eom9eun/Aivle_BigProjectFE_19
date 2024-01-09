import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import PrivacyPolicy from './PrivacyPolicy'

function PrivacyModal() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
        <span onClick={onOpen} style={{fontWeight:'bold', paddingRight: '10px', cursor: 'pointer'}}>개인정보 처리방침</span>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} className='modal'>
        <ModalContent style={{fontFamily: 'JalnanGothic'}} className='modal-content max-h-[90%] max-w-full w-full overflow-y-auto'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">LiQuest 개인정보 처리방침</ModalHeader>
              <ModalBody style={{ maxHeight: "90vh", overflowY: "auto"}}>
                <PrivacyPolicy />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PrivacyModal