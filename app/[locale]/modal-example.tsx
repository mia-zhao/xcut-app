"use client";

import Modal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import useModal, { ModalProps } from "@/lib/hooks/use-modal";

export default function ModalExample() {
  const { Modal } = useModal(ExampleModal, {
    trigger: <Button>modal trigger</Button>,
  });

  return <Modal />;
}

function ExampleModal({
  showModal,
  setShowModal,
  trigger,
}: ModalProps & { trigger: React.ReactNode }) {
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      trigger={trigger}
      title="MODAL TITLE"
      description="MODAL DESCRIPTION"
    >
      MODAL CONTENT
    </Modal>
  );
}
