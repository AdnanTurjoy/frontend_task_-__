import React, { useRef, useState } from 'react';

import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Avatar, Card, Dropdown, Form, Input, Space, Table, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDeleteUserMutation, useEditUserMutation, useGetSingleUserMutation, useGetUsersQuery } from '../features/apiSlice';
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
	  const [editUser, { isLoading: editLoading }] = useEditUserMutation()
	  const [viewUser, { isLoading: viewLoading }]=useGetSingleUserMutation()
	  const [isModalOpen, setIsModalOpen] = useState({
		open: false,
		type:""
	  });
	  const [formValues,setFormValues] = useState({name:"",job:""})
	  const [user,setUser] = useState<DataType>({})

//    console.log(users);


const handleOk = async () => {
	if(isModalOpen.type==="_EDIT"){
		try {
			const response = await editUser({...formValues,id:user.id}).unwrap()
			console.log(response);
			setIsModalOpen({open:false,type:""});
			setFormValues({name:"",job:""})
			
		} catch (error) {
			console.log(error);
		}
	}else{
		setIsModalOpen({open:false,type:""});
	}
	
   
  };

  const handleCancel = () => {
	setUser({})
	setFormValues({})
    setIsModalOpen({open:false,type:""});
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
		 <a onClick={() => onSingleUser(record.id,"_VIEW")} style={{ marginRight: 8 }}>
              View
        </a>
		<a onClick={() => onSingleUser(record.id,"_EDIT")} style={{ marginRight: 8 }}>
              Edit
        </a>

		<a onClick={() => showDeleteConfirm(record.id)} style={{ marginRight: 8 }}>
              Delete
        </a>
	
		 </Space>
	  ),
	},
  ];
  const handleEditForm =(event: { target: { name: string; value: string; }; })=>{
	const { name, value } = event.target;
	setFormValues({ ...formValues, [name]: value });
  }
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

	const onSingleUser = async (id: Number, type: string) => {
		try {
			const response = await viewUser(id).unwrap()
			setUser(response.data)
			setIsModalOpen({open:true,type});
			
		} catch (error) {
			console.log(error);
		}
	};

  return <>
  {isLoading ? "Loading...." : 
    <Table columns={columns} dataSource={users.data} />
  }
  <Modal title="User" open={isModalOpen.open} onOk={handleOk} onCancel={handleCancel} >
  <Card
    style={{ width: 450, }}
    cover={
      <img
        alt="example"
        src={user.avatar}
      />
    }
    
  >
	{
		isModalOpen.type==="_EDIT" ?
		<>
		   <input name="name" type="text" placeholder='Your new name' onChange={handleEditForm} />
		   <input name="job" type="text" placeholder='Your Job' onChange={handleEditForm} />
		</>
		:
		<Meta
		avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
		title={user.first_name}
		description={user.email}
	  >
		  
	  </Meta>
	}
	
  
  </Card>
    </Modal>
  </>;
};

export default Dashboard;