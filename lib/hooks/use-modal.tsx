"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useMemo,
  JSX,
} from "react";

export interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type ModalComponentType<T extends ModalProps> = (props: T) => JSX.Element;

export default function useModal<T extends ModalProps>(
  ModalComponent: ModalComponentType<T>,
  props?: Omit<T, keyof ModalProps>
) {
  const [showModal, setShowModal] = useState(false);

  const renderModal = useCallback(() => {
    return <ModalComponent {...(props as T)} />;
  }, [ModalComponent, props]);

  return useMemo(
    () => ({ Modal: renderModal, setShowModal, showModal }),
    [setShowModal, renderModal, showModal]
  );
}
