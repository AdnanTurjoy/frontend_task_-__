import React, { useRef, useState } from 'react';

import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Avatar, Card, Dropdown, Input, Space, Table, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDeleteUserMutation, useGetSingleUserMutation, useGetUsersQuery } from '../features/apiSlice';
import type { MenuProps } from 'antd';
import { Button, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ExclamationCircleFilled } from '@ant-design/icons';

type InputRef = GetRef<typeof Input>;

interface DataType {
	id: Number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

const Dashboard: React.FC = () => {
	const { confirm } = Modal;
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	  } = useGetUsersQuery(1)
	  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()
	  const [viewUser, { isLoading: viewLoading }]=useGetSingleUserMutation()
	  const [isModalOpen, setIsModalOpen] = useState(false);
	  const [user,setUser] = useState<DataType>({})

//    console.log(users);




  const handleCancel = () => {
	setUser({})
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '20%',
	  render: (_, { avatar }) => (
		<>		  
			<img style={{borderRadius: "50%", height:"45px", width: "45px"}} src={avatar} alt="" />
		
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
		 <a onClick={() => onSingleUser(record.id)} style={{ marginRight: 8 }}>
              View
        </a>
		<a onClick={() => console.log(record)} style={{ marginRight: 8 }}>
              Edit
        </a>

		<a onClick={() => showDeleteConfirm(record.id)} style={{ marginRight: 8 }}>
              Delete
        </a>
	
		 </Space>
	  ),
	},
  ];
  const showDeleteConfirm = (id:Number) => {
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
	const onDelete = async (id: Number) => {
		try {
			const response = await deleteUser(id).unwrap()
			console.log(response);
			
		} catch (error) {
			console.log(error);
		}
	};

	const onSingleUser = async (id: Number) => {
		try {
			const response = await viewUser(id).unwrap()
			setUser(response.data)
			setIsModalOpen(true);
			
		} catch (error) {
			console.log(error);
		}
	};

  return <>
  {isLoading ? "Loading...." : 
    <Table columns={columns} dataSource={users.data} />
  }
  <Modal title="User" open={isModalOpen}   onCancel={handleCancel} >
  <Card
    style={{ width: 450, }}
    cover={
      <img
        alt="example"
        src={user.avatar}
      />
    }
    
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={user.first_name}
      description={user.email}
    />
  </Card>
    </Modal>
  </>;
};

export default Dashboard;