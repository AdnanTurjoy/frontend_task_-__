import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Table,
  Space,
  Pagination,
  Card,
  Avatar,
  PaginationProps,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetSingleUserMutation,
  useGetUsersByPageMutation,
} from '../features/apiSlice';
import CreateForm from '../components/CreateForm';

const { confirm } = Modal;
const { Meta } = Card;


interface DataType {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}


const { Search } = Input;
const Dashboard: React.FC = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();
  const [viewUser] = useGetSingleUserMutation();
  const [getUsers] = useGetUsersByPageMutation();
  const [isModalOpen, setIsModalOpen] = useState<{ open: boolean; type: string }>({
    open: false,
    type: '',
  });
  const [formValues, setFormValues] = useState<{ name: string; job: string }>({ name: '', job: '' });
  const [user, setUser] = useState<DataType | null>(null);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>();
  const [val, setVal] = useState<string>('');

  useEffect(() => {
    fetchRecords(1);
  }, []);

  const fetchRecords = async (page: number) => {
    setLoading(true);
    try {
      const users: any = await getUsers(page);
      setDataSource(users?.data.data);
      setCurrent(users?.data.page);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    if (isModalOpen.type === '_EDIT') {
      try {
        const response = await editUser({ ...formValues, id: user?.id }).unwrap();
        console.log(response);
        setIsModalOpen({ open: false, type: '' });
        setFormValues({ name: '', job: '' });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsModalOpen({ open: false, type: '' });
    }
  };

  const handleCancel = () => {
    setUser({
      id: 0,
      email: '',
      avatar: '',
      first_name: '',
      last_name: '',
    });
    setFormValues({ name: '', job: '' });
    setIsModalOpen({ open: false, type: '' });
  };

  const filterVals = useCallback(
    (e: { target: { value: string } }) => {
      const currValue = e.target.value;
      setVal(currValue);
      const filteredVals = dataSource.filter((entry) =>
        entry.first_name.includes(currValue)
      );
      setDataSource(filteredVals);
    },
    [loading]
  );

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '20%',
      render: (_: any, { avatar }: DataType) => (
        <>
          <img
            style={{ borderRadius: '50%', height: '45px', width: '45px' }}
            src={avatar}
            alt=""
          />
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '20%',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      width: '30%',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a onClick={() => onSingleUser(record.id, '_VIEW')} style={{ marginRight: 8 }}>
            View
          </a>
          <a onClick={() => onSingleUser(record.id, '_EDIT')} style={{ marginRight: 8 }}>
            Edit
          </a>
          <a onClick={() => showDeleteConfirm(record.id)} style={{ marginRight: 8 }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const handleEditForm = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteUser(id).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSingleUser = async (id: number, type: string) => {
    try {
      const response = await viewUser(id).unwrap();
      setUser(response.data);
      setIsModalOpen({ open: true, type });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setIsModalOpen({ open: true, type: '_CREATE' });
  };

  const onPageChange: PaginationProps['onChange'] = (page) => {
    fetchRecords(page);
  };

  return (
    <>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Form.Item>
      <Search
        value={val}
        onChange={filterVals}
        style={{ marginBottom: '10px' }}
        placeholder="...search name"
        loading={false}
      />

      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={false}></Table>
      <Pagination
        style={{ marginTop: '10px' }}
        current={current}
        onChange={onPageChange}
        total={50}
      />

      <Modal
        title="User"
        visible={isModalOpen.open}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{
          style: isModalOpen.type !== '_EDIT' ? {
            display: 'none',
          } : {},
        }}
      >
        <Card
          style={{ width: 450 }}
          cover={isModalOpen.type !== '_CREATE' && <img alt="avatar" src={user?.avatar} />}
        >
          {isModalOpen.type === '_EDIT' ? (
            <>
              <input name="name" type="text" placeholder="Your new name" onChange={handleEditForm} />
              <input name="job" type="text" placeholder="Your Job" onChange={handleEditForm} />
            </>
          ) : isModalOpen.type === '_VIEW' ? (
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={user?.first_name}
              description={user?.email}
            />
          ) : (
            <CreateForm handleCancel={handleCancel}/>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default Dashboard;
