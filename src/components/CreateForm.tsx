import  { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { useCreateUserMutation } from '../features/apiSlice';

type FieldType = {
  job?: string;
  name?: string;
};

interface CreateFormProps {
  handleCancel: () => void;
}

const CreateForm: FC<CreateFormProps> = ({ handleCancel }) => {
  const [createUser] = useCreateUserMutation();

  const onFinish = async (values: FieldType) => {
    let formData = {
      name: values.name,
      job: values.job,
    };
    try {
      const response = await createUser(formData).unwrap();
	  if(response) handleCancel();
	  
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Job"
        name="job"
        rules={[{ required: true, message: 'Please input your Job!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
