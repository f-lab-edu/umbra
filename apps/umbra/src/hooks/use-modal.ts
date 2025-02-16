import { modalSelector, ModalsEnum } from '../store/modal-slice';
import { useStore } from '../store/store';

const useModal = <P>(name: ModalsEnum) => {
  const setModal = useStore(modalSelector.setModalInfo);

  return {
    open: (props: P) => {
      setModal({
        modalName: name,
        props: props,
      });
    },
    close: () => {
      setModal(null);
    },
  };
};

export { useModal };
