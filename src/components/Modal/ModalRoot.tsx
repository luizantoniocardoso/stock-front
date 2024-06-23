import { ReactNode } from "react";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";

interface ModalRootProps{
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;

}

export const ModalRoot = ({showModal, setShowModal, children}: ModalRootProps): JSX.Element => {

    return (
      <div>
        <TEModal show={showModal} setShow={setShowModal}>
          <TEModalDialog>
            <TEModalContent>
              {children}
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    );
  }