import { useModal } from "../context/ModalContext";

const GlobalModal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 w-screen flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 shadow-lg w-full rounded-xl max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
          ✖
        </button>
        <div className="max-h-[80vh] w-full  overflow-y-auto">{modalContent}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
