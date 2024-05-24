import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 20px;
  height: 70%;
  min-height: 500px;
  width: 25%;
  min-width: 300px;
  border-radius: 2%;
`;

const ModalBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: auto;
  justify-content: flex-end;
`;

const ModalSave = styled.button`
  background-color: #4981d8;
`;

const ModalClose = styled.button`
  background-color: #453d41;
`;

export interface iModalProps extends React.PropsWithChildren {
  handleOnClose: () => void;
  handleOnSave: () => void;
}

const CLOSE_BUTTON_TEXT = "ביטול";
const SAVE_BUTTON_TEXT = "שמירה";

const Modal: React.FC<iModalProps> = ({
  handleOnClose,
  handleOnSave,
  children,
}: iModalProps) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <ModalBottomButtons>
          <ModalClose onClick={handleOnClose}>{CLOSE_BUTTON_TEXT}</ModalClose>
          <ModalSave onClick={handleOnSave}>{SAVE_BUTTON_TEXT}</ModalSave>
        </ModalBottomButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
