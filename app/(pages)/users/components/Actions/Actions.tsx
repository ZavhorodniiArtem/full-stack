'use client';

import { Button, Flex, message, Popconfirm } from 'antd';
import { useState } from 'react';
import UserModal from '@/app/(pages)/users/components/UserModal';
import useUsersContext from '@/app/(pages)/users/context/UsersContext';
import { useRemoveUser } from '@/app/shared/hooks/api/useUsers/queries';
import { DELETE_CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '@/app/utils/messages';

const Actions = () => {
  const [openModal, setOpenModal] = useState(false);

  const user = useUsersContext();

  const { mutate: removeUser } = useRemoveUser(user.id);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  const handleDelete = () => {
    removeUser();
    void message.success(SUCCESS_MESSAGE);
  };

  return (
    <>
      {openModal && (
        <UserModal isOpen={openModal} handleClose={handleClose} isEdit />
      )}
      <Flex gap={16} justify='end'>
        <Button onClick={handleOpen}>Edit</Button>
        <Popconfirm title={DELETE_CONFIRM_MESSAGE} onConfirm={handleDelete}>
          <Button danger>Delete</Button>
        </Popconfirm>
      </Flex>
    </>
  );
};

export default Actions;
