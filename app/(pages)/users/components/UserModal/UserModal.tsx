import { Button, Flex, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UserBody, UserModalProps } from './types';
import useUsersContext from '@/app/(pages)/users/context/UsersContext';
import {
  useAddUser,
  useUpdateUser,
} from '@/app/shared/hooks/api/useUsers/queries';
import { SUCCESS_MESSAGE } from '@/app/utils/messages';

const UserModal = ({ isEdit, isOpen, handleClose }: UserModalProps) => {
  const user = useUsersContext();
  const [form] = useForm<UserBody>();

  const { mutate: createUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser(user.id);

  const onFinish = () => {
    const body = form.getFieldsValue();

    if (isEdit) {
      updateUser(body);
      void message.success(SUCCESS_MESSAGE);
      handleClose();
      return;
    }

    createUser(body);
    void message.success(SUCCESS_MESSAGE);
    handleClose();
  };

  return (
    <Modal
      width={600}
      open={isOpen}
      title={isEdit ? 'Edit user' : 'Add user'}
      onCancel={handleClose}
      footer={false}
    >
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        initialValues={{ name: user.name || '', email: user.email || '' }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[
            { required: true, message: 'Name is required!' },
            { max: 50, message: 'Max length 50 characters!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Email is required!' },
            { type: 'email', message: 'Email is not valid!' },
            { max: 50, message: 'Max length 100 characters!' },
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

export default UserModal;
