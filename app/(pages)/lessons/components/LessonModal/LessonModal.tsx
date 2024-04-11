import { Button, Flex, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LessonBody, LessonModalProps } from './types';
import { SUCCESS_MESSAGE } from '@/app/utils/messages';
import useLessonsContext from '@/app/(pages)/lessons/context/LessonsContext';
import {
  useAddLesson,
  useUpdateLesson,
} from '@/app/shared/hooks/api/useLessons/queries';

const LessonModal = ({ isEdit, isOpen, handleClose }: LessonModalProps) => {
  const lesson = useLessonsContext();
  const [form] = useForm<LessonBody>();

  const { mutate: createLesson } = useAddLesson();
  const { mutate: updateLesson } = useUpdateLesson(lesson.id);

  const onFinish = () => {
    const body = form.getFieldsValue();

    if (isEdit) {
      updateLesson(body);
      void message.success(SUCCESS_MESSAGE);
      handleClose();
      return;
    }

    createLesson(body);
    void message.success(SUCCESS_MESSAGE);
    handleClose();
  };

  return (
    <Modal
      width={600}
      open={isOpen}
      title={isEdit ? 'Edit lesson' : 'Add lesson'}
      onCancel={handleClose}
      footer={false}
    >
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        initialValues={{
          author: lesson.author || '',
          title: lesson.title || '',
          description: lesson.description,
          link: lesson.link,
        }}
      >
        <Form.Item
          name='author'
          label='Author'
          rules={[
            { required: true, message: 'Name is required!' },
            { max: 100, message: 'Max length 100 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='title'
          label='Title'
          rules={[
            { required: true, message: 'Title is required!' },
            { max: 100, message: 'Max length 100 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Description is required!' },
            { max: 250, message: 'Max length 250 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='link'
          label='Link'
          rules={[
            { required: true, message: 'Link is required!' },
            { max: 250, message: 'Max length 250 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Flex gap={16} justify='end'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='primary' htmlType='submit'>
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default LessonModal;
