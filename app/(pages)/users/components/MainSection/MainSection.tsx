'use client';

import { useState } from 'react';
import { Button, Flex } from 'antd';
import UserModal from '@/app/(pages)/users/components/UserModal';
import {
  useFetchFilteredUsers,
  useFetchUsers,
} from '@/app/shared/hooks/api/useUsers/queries';
import Search from '@/app/shared/components/Search';

const MainSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useFetchUsers();
  const { mutate } = useFetchFilteredUsers();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && <UserModal isOpen={isOpen} handleClose={handleClose} />}

      <Flex gap={24}>
        <Button type='primary' onClick={handleOpen}>
          Add user
        </Button>
        <Search data={data} mutateFilters={mutate} />
      </Flex>
    </>
  );
};

export default MainSection;
