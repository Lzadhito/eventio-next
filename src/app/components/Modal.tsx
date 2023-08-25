import { ReactElement, useEffect } from 'react';
import Icon from './Icon';

interface Props {
  visible: boolean;
  children: ReactElement | ReactElement[];
  onClose: () => void;
}

export default function Modal({ children, visible, onClose }: Props) {
  useEffect(() => {
    window.Modal.addEventListener('close', () => {
      onClose();
    });
  }, []);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (visible) window.Modal.showModal();
      else window.Modal.close();
    }, 0);

    return () => {
      clearTimeout(timer1);
    };
  }, [visible]);

  return (
    <dialog id="Modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box min-h-fit max-h-screen relative">
        <button className="btn btn-circle bg-transparent absolute top-4 right-4" onClick={() => window.Modal.close()}>
          <Icon icon="remove" />
        </button>
        {visible ? children : null}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>hidden button</button>
      </form>
    </dialog>
  );
}
