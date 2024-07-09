/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../Modal"


interface ContentDeleteItemProps {
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModalOpen: boolean;
    selectedItem: any;
    onConfirmDeleteItem: () => void;
    text?: string;
    title: string;
}
export const ContentDeleteItem = ({deleteModalOpen,onConfirmDeleteItem,setDeleteModalOpen, text, title}:ContentDeleteItemProps) => {


    return (
        <Modal.Root setShowModal={setDeleteModalOpen} showModal={deleteModalOpen} >
          <Modal.Header title={title} setShowModal={() => setDeleteModalOpen(false)}/>
          <Modal.Body>
            <p>{text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button onClickFunction={() => setDeleteModalOpen(false)} type='danger'>Cancelar</Modal.Button>
            <Modal.Button onClickFunction={onConfirmDeleteItem} type='success'>Aprovar</Modal.Button>
          </Modal.Footer>
      </Modal.Root>
    )
}