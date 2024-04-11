import { useState } from 'react';
import { Button, Modal } from 'antd';
import { VideoModalProps } from '@/app/(pages)/lessons/components/VideoModal/types';

const VideoModal = ({ link, title }: VideoModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  return (
    <>
      <Button type='link' onClick={handleOpen}>
        {link}
      </Button>

      {openModal && (
        <Modal
          width={1280}
          open={openModal}
          title={title}
          onCancel={handleClose}
          footer={false}
        >
          <iframe src={link} allowFullScreen width='1236' height='695' />
        </Modal>
      )}
    </>
  );
};

export default VideoModal;
