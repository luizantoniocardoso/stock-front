/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../Modal"


interface ContentDeleteItemProps {
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModalOpen: boolean;
    selectedItem: any;
    onConfirmDeleteItem: () => void;
}
export const ContentDeleteItem = ({deleteModalOpen,onConfirmDeleteItem ,selectedItem,setDeleteModalOpen}:ContentDeleteItemProps) => {


    return (
        <Modal.Root setShowModal={setDeleteModalOpen} showModal={deleteModalOpen} >
          <Modal.Header title='Deletar Usuario' setShowModal={() => setDeleteModalOpen(false)}/>
          <Modal.Body>
            <p>Tem certeza que deseja deletar o usuario {selectedItem?.nome} do cpf {selectedItem?.cpf} ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button onClickFunction={() => setDeleteModalOpen(false)} type='danger'>Cancelar</Modal.Button>
            <Modal.Button onClickFunction={onConfirmDeleteItem} type='success'>Aprovar</Modal.Button>
          </Modal.Footer>
      </Modal.Root>
    )
}