import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

export default function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name={"cabin-form"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}
