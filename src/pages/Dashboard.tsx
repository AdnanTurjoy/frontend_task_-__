import React, { useEffect, useRef, useState } from 'react';

import type { GetRef, PaginationProps, TableColumnsType, TableColumnType } from 'antd';
import { Avatar, Card, Dropdown, Form, Input, Pagination, Space, Table, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDeleteUserMutation, useEditUserMutation, useGetSingleUserMutation, useGetUsersByPageMutation, useGetUsersQuery } from '../features/apiSlice';
import type { MenuProps } from 'antd';
import { Button, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ExclamationCircleFilled } from '@ant-design/icons';
import CreateForm from '../components/CreateForm';

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
	
	const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()
	const [editUser, { isLoading: editLoading }] = useEditUserMutation()
	const [viewUser, { isLoading: viewLoading }] = useGetSingleUserMutation()
	const [getUsers, { isLoading: userLoading }] = useGetUsersByPageMutation()
	const [isModalOpen, setIsModalOpen] = useState({
		open: false,
		type: ""
	});
	const [formValues, setFormValues] = useState({ name: "", job: "" })
	const [user, setUser] = useState<DataType>({})
	const [dataSource, setDataSource] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchRecords(1);
	  }, []);

	  const fetchRecords = async (page) => {
		setLoading(true);
		try {
			const users = await getUsers(page)
			console.log(users.data.data)
		    setDataSource(users?.data)
			setTotalPages(res.data.total_pages);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
		
	  };
	const handleOk = async () => {
		if (isModalOpen.type === "_EDIT") {
			try {
				const response = await editUser({ ...formValues, id: user.id }).unwrap()
				console.log(response);
				setIsModalOpen({ open: false, type: "" });
				setFormValues({ name: "", job: "" })

			} catch (error) {
				console.log(error);
			}
		} else {
			setIsModalOpen({ open: false, type: "" });
		}


	};

	const handleCancel = () => {
		setUser({})
		setFormValues({})
		setIsModalOpen({ open: false, type: "" });
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			width: '20%',
			render: (_, { avatar }) => (
				<>
					<img style={{ borderRadius: "50%", height: "45px", width: "45px" }} src={avatar} alt="" />

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
					<a onClick={() => onSingleUser(record.id, "_VIEW")} style={{ marginRight: 8 }}>
						View
					</a>
					<a onClick={() => onSingleUser(record.id, "_EDIT")} style={{ marginRight: 8 }}>
						Edit
					</a>

					<a onClick={() => showDeleteConfirm(record.id)} style={{ marginRight: 8 }}>
						Delete
					</a>

				</Space>
			),
		},
	];
	const handleEditForm = (event: { target: { name: string; value: string; }; }) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	}
	const showDeleteConfirm = (id: Number) => {
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
			setIsModalOpen({ open: true, type });

		} catch (error) {
			console.log(error);
		}
	};

	const handleCreate = () => {
		setIsModalOpen({ open: true, type: "_CREATE" });
	}
	const onPageChange: PaginationProps['onChange'] = (page) => {
		fetchRecords(page);
	  };
	

	return <>
		<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
			<Button type="primary" onClick={handleCreate}>
				Create
			</Button>
		</Form.Item>
		
			  <Table
			  loading={loading}
			  columns={columns}
			  dataSource={dataSource.data}
			  pagination={false}
			></Table>
			<Pagination style={{marginTop:"10px"}} current={dataSource.page} onChange={onPageChange} total={50} />
		
		<Modal title="User" open={isModalOpen.open} onOk={handleOk} onCancel={handleCancel}
			cancelButtonProps={{ style: { display: 'none' } }}
			okButtonProps={{
				style: isModalOpen.type !== "_EDIT" ? {
					display: 'none'
				} : {}
			}}
		>
			<Card
				style={{ width: 450, }}
				cover={
					isModalOpen.type !== "_CREATE" && <img
						alt="avatar"
						src={user.avatar}
					/>
				}

			>
				{
					isModalOpen.type === "_EDIT" ?
						<>

							<input name="name" type="text" placeholder='Your new name' onChange={handleEditForm} />
							<input name="job" type="text" placeholder='Your Job' onChange={handleEditForm} />
						</>
						: isModalOpen.type === "_VIEW" ?
							<Meta
								avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
								title={user.first_name}
								description={user.email}
							>

							</Meta> : <CreateForm />
				}


			</Card>
		</Modal>
	</>;
};

export default Dashboard;