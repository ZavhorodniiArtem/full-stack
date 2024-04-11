'use client';

import { useState } from 'react';
import { Button, Flex } from 'antd';
import {
  useFetchFilteredLessons,
  useFetchLessons,
} from '@/app/shared/hooks/api/useLessons/queries';
import LessonModal from '@/app/(pages)/lessons/components/LessonModal/LessonModal';
import Search from '@/app/shared/components/Search';

const MainSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useFetchLessons();
  const { mutate } = useFetchFilteredLessons();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && <LessonModal isOpen={isOpen} handleClose={handleClose} />}

      <Flex gap={24}>
        <Button type='primary' onClick={handleOpen}>
          Add lesson
        </Button>
        <Search data={data} mutateFilters={mutate} />
      </Flex>
    </>
  );
};

export default MainSection;
