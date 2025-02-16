import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ModalContext = createContext<{
  open: (id: string, modalElement: FC<{ isOpen: boolean; close: () => void }>) => void;
  close: (id: string) => void;
  unmount: (id: string) => void;
} | null>(null);

type ModalInfo = Map<
  string,
  {
    element: FC<{ isOpen: boolean; close: () => void }>;
    isOpen: boolean;
  }
>;

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalInfo, setModalInfo] = useState<ModalInfo>(new Map());

  const mount = useCallback((id: string, modalElement: FC<{ isOpen: boolean; close: () => void }>) => {
    setModalInfo((prevModalInfo) => {
      const newModalInfo = new Map(prevModalInfo);
      newModalInfo.set(id, {
        element: modalElement,
        isOpen: false,
      });
      return newModalInfo;
    });
  }, []);
  const unmount = useCallback((id: string) => {
    setModalInfo((prevModalInfo) => {
      const newModalInfo = new Map(prevModalInfo);
      newModalInfo.delete(id);
      return newModalInfo;
    });
  }, []);
  const open = useCallback((id: string, modalElement: FC<{ isOpen: boolean; close: () => void }>) => {
    setModalInfo((prevModalInfo) => {
      const newModalInfo = new Map(prevModalInfo);
      newModalInfo.set(id, {
        element: modalElement,
        isOpen: true,
      });
      return newModalInfo;
    });
  }, []);
  const close = useCallback((id: string) => {
    setModalInfo((prevModalInfo) => {
      if (!prevModalInfo.has(id)) {
        throw new Error(`Modal with id "${id}" does not exist.`);
      }

      const newModalInfo = new Map(prevModalInfo);
      const modalInfoById = newModalInfo.get(id)!;

      newModalInfo.set(id, {
        ...modalInfoById,
        isOpen: false,
      });

      return newModalInfo;
    });
  }, []);

  const contextValue = useMemo(() => ({ mount, unmount, open, close }), [mount, unmount, open, close]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {Array.from(modalInfo.entries()).map(([id, { isOpen, element: ModalContentElement }]) => (
        <ModalContentElement key={id} isOpen={isOpen} close={() => close(id)} />
      ))}
    </ModalContext.Provider>
  );
};

let randomId = 0;

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error('ModalProvider ');
  }

  const modalId = useMemo(() => String(randomId++), []);

  useEffect(() => {
    return () => {
      context.unmount(modalId);
    };
  }, []);

  return useMemo(
    () => ({
      open: (ModalComponent: FC<{ isOpen: boolean; close: () => void }>) => {
        context.open(modalId, ModalComponent);
      },
    }),
    [context, modalId],
  );
};

export { ModalProvider, useModal };
