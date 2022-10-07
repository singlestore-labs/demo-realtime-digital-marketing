import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import LAPTOP_CIRCLE_ICON from "../assets/laptop-circle-icon.svg";
  
  export function WelcomeModal() {
    const [openModal, setOpenModal] = useState(true);
  
    function handleCloseModal() {
      setOpenModal(false);
    }
  
    return (
      <Modal isOpen={openModal} onClose={handleCloseModal} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent style={{ paddingTop: 50, paddingBottom: 50 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <img src={LAPTOP_CIRCLE_ICON} />
          </div>
          <ModalBody>
            <div style={{ fontWeight: 700, textAlign: "center", fontSize: 16 }}>
              Welcome to Realtime Digital Marketing
            </div>
  
            <div style={{ textAlign: "center", padding: 8, fontSize: 14 }}>
              This application is a demo of how to use SingleStoreDB to serve ads
              to users based on their behavior and location.
            </div>
          </ModalBody>
  
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleCloseModal}
              style={{ backgroundColor: "#8800CC", color: "#ffffff" }}
            >
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  