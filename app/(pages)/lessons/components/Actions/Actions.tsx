'use client';

import { Button, Flex, message, Popconfirm } from 'antd';
import { useState } from 'react';
import { DELETE_CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '@/app/utils/messages';
import useLessonsContext from '@/app/(pages)/lessons/context/LessonsContext';
import LessonModal from '@/app/(pages)/lessons/components/LessonModal/LessonModal';
import { useRemoveLesson } from '@/app/shared/hooks/api/useLessons/queries';

const Actions = () => {
  const [openModal, setOpenModal] = useState(false);

  const lesson = useLessonsContext();

  const { mutate: removeLesson } = useRemoveLesson(lesson.id);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  const handleDelete = () => {
    removeLesson();
    void message.success(SUCCESS_MESSAGE);
  };

  return (
    <>
      {openModal && (
        <LessonModal isOpen={openModal} handleClose={handleClose} isEdit />
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
