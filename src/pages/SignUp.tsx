import React from "react";
import {
	Button,
	Checkbox,
	Flex,
	Form,
	Grid,
	Input,
	Typography,
	theme,
} from "antd";
import { AppleOutlined, GoogleOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignUpPostMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

interface AppProps { }

const SignUp: React.FC<AppProps> = () => {
	const { token } = useToken();
	const screens = useBreakpoint();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [addNewUser, { isLoading }] = useSignUpPostMutation()

	const onFinish = async (values: any) => {

		let formData = {
			email: values.email,
			password: values.password,
		}
		try {
			const response = await addNewUser(formData).unwrap()
			dispatch(setCredentials({ ...response }))
			navigate("/")
		} catch (error) {
			console.log(error);
		}
	};

	const styles = {
		container: {
			margin: "0 auto",
			padding: screens.md
				? `${token.paddingXL}px`
				: `${token.sizeXXL}px ${token.padding}px`,
			width: "400px",
		},
		footer: {
			marginTop: token.marginLG,
			textAlign: "center",
			width: "100%",
		},
		forgotPassword: {
			float: "right",
		},
		header: {
			marginBottom: token.marginXL,
		},
		section: {
			alignItems: "center",
			backgroundColor: token.colorBgContainer,
			display: "flex",
			height: screens.sm ? "70vh" : "auto",
			padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
		},
		text: {
			color: token.colorTextSecondary,

		},
		input: {
			padding: "6px"
		},
		title: {
			fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
		},
		socialBtn: {
			borderRadius: "16px",
			background: "#F0F5FA",
			paddingBottom: "7px",
			height: "44px",
		},
		line: {
			height: "2px",
			width: "140px",
			background: "#F0F5FA",
		}
	};


	return (
		<section style={styles.section}>
			<div style={styles.container}>
				<div style={styles.header}>

					<Title style={styles.title}>Getting Started</Title>
					<Text style={styles.text}>
						Create an account to continue!
					</Text>
					<Flex justify="space-between" align="center" style={{ marginTop: "17px" }}>


						<Button style={styles.socialBtn} type="outline"><GoogleOutlined /> Sign In with Google</Button>
						<Button style={styles.socialBtn} type="outline"><AppleOutlined /> Sign In with Apple ID</Button>

					</Flex>


				</div>
				<Flex justify="space-between" align="center" style={{ marginTop: "0px", marginBottom: "17px" }}>


					<span style={styles.line}></span>
					<span style={{ paddingRight: "15px", color: "#B0B7C3" }}>OR</span>
					<span style={styles.line}></span>

				</Flex>

				<Form
					name="normal_login"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					layout="vertical"
					requiredMark="optional"
				>
					<Form.Item
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input style={styles.input} prefix={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path d="M9.99994 19.1658C8.71578 19.1671 7.44547 18.9008 6.26999 18.3839C4.91221 17.7803 3.7215 16.8557 2.80043 15.6897C1.87935 14.5238 1.25552 13.1514 0.982663 11.6908C0.709808 10.2302 0.796102 8.72518 1.23412 7.30529C1.67215 5.88543 2.44876 4.59334 3.49707 3.5403C4.34664 2.67944 5.3593 1.99659 6.47584 1.53164C7.5924 1.0667 8.7904 0.829009 9.99994 0.832465C10.2896 0.832465 10.5839 0.846215 10.8735 0.873715C13.1635 1.13239 15.2772 2.22845 16.808 3.95118C18.3389 5.67391 19.1789 7.90172 19.1666 10.2063V10.8242C19.1666 11.7194 18.8127 12.5783 18.1819 13.2137C17.5513 13.8491 16.6949 14.2092 15.7997 14.2158C15.741 14.2158 15.6814 14.2158 15.6228 14.2113C15.1037 14.181 14.5989 14.0297 14.1488 13.7694C13.6986 13.5092 13.3156 13.1472 13.0304 12.7125C12.4795 13.4876 11.7054 14.0763 10.8113 14.4001C9.91717 14.7239 8.9455 14.7673 8.02608 14.5245C7.10665 14.2817 6.28311 13.7643 5.66537 13.0413C5.04763 12.3183 4.66505 11.4242 4.56869 10.4781C4.47233 9.53203 4.66677 8.57916 5.12606 7.74645C5.58536 6.91377 6.28766 6.24096 7.13927 5.81779C7.99087 5.39462 8.95127 5.24122 9.89232 5.37806C10.8334 5.51489 11.7103 5.93546 12.4062 6.58363C12.4311 6.36378 12.5359 6.16074 12.7006 6.01304C12.8653 5.86536 13.0787 5.78331 13.2999 5.78246C13.543 5.78246 13.7761 5.87905 13.9481 6.05096C14.12 6.22286 14.2166 6.45602 14.2166 6.69913V10.6628C14.2005 11.0845 14.345 11.4965 14.6209 11.8157C14.897 12.1349 15.2839 12.3375 15.7034 12.3825H15.7722C15.9771 12.3829 16.1799 12.3428 16.3693 12.2646C16.5587 12.1865 16.7308 12.0718 16.8759 11.927C17.0209 11.7823 17.1358 11.6104 17.2144 11.4211C17.2929 11.2319 17.3333 11.029 17.3333 10.8242V10.2054C17.3488 8.35696 16.6805 6.56798 15.457 5.18234C14.2335 3.79671 12.5409 2.91219 10.7049 2.6988C10.472 2.67771 10.2355 2.6658 9.99994 2.6658C8.97272 2.66543 7.9569 2.88087 7.01829 3.29813C6.07967 3.71541 5.23918 4.32521 4.55127 5.08804C3.86337 5.85088 3.3434 6.74971 3.02504 7.72632C2.70669 8.70291 2.59705 9.73554 2.70324 10.7573C2.8401 12.0531 3.31936 13.2891 4.09181 14.3384C4.86427 15.3878 5.90209 16.2126 7.09872 16.7283C8.29531 17.244 9.60761 17.4319 10.9009 17.2727C12.1942 17.1136 13.4218 16.6131 14.4577 15.8228C14.5532 15.7495 14.6623 15.6959 14.7786 15.6648C14.8949 15.6338 15.0162 15.6259 15.1356 15.6418C15.2549 15.6577 15.37 15.6968 15.4741 15.7571C15.5783 15.8174 15.6696 15.8976 15.7429 15.9933C15.816 16.0888 15.8696 16.1979 15.9007 16.3142C15.9318 16.4305 15.9396 16.5518 15.9237 16.6711C15.9079 16.7905 15.8687 16.9055 15.8084 17.0097C15.7482 17.1139 15.6679 17.2052 15.5724 17.2784C13.9709 18.4994 12.0137 19.1624 9.99994 19.1658ZM9.25011 7.16572C8.68966 7.16554 8.14173 7.33156 7.67566 7.64279C7.20959 7.95402 6.84628 8.39647 6.63168 8.9142C6.41708 9.43194 6.36085 10.0016 6.47007 10.5514C6.5793 11.101 6.84908 11.606 7.2453 12.0024C7.64152 12.3987 8.14639 12.6687 8.69607 12.778C9.24571 12.8874 9.81541 12.8314 10.3332 12.617C10.8511 12.4026 11.2936 12.0394 11.605 11.5734C11.9164 11.1074 12.0826 10.5595 12.0826 9.99917C12.0816 9.24814 11.7829 8.5281 11.2519 7.997C10.721 7.46587 10.001 7.16693 9.25011 7.16572Z" fill="#C5CBD3" />
						</svg>} placeholder="Your Email" />
					</Form.Item>
					<Form.Item
					
						name="name"
						rules={[
							{
								type: "text",
								required: true,
								message: "Please input your Name!",
							},
						]}
					>
						<Input style={styles.input} prefix={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<g clip-path="url(#clip0_6_37)">
								<circle cx="10" cy="10" r="10" fill="#EDEFF1" />
								<path d="M13.3875 12.2842C12.9742 12.7813 12.4565 13.1814 11.8712 13.456C11.2858 13.7306 10.6472 13.8729 10.0006 13.8729C9.3541 13.8729 8.71548 13.7306 8.13014 13.456C7.5448 13.1814 7.02708 12.7813 6.61376 12.2842C6.44788 12.0927 6.21355 11.9739 5.96107 11.9533C5.70859 11.9326 5.45808 12.0118 5.26332 12.1738C5.06856 12.3358 4.94507 12.5677 4.91937 12.8197C4.89366 13.0717 4.96778 13.3238 5.12582 13.5217C5.72158 14.236 6.46702 14.8106 7.3094 15.205C8.15179 15.5993 9.07054 15.8037 10.0006 15.8037C10.9308 15.8037 11.8495 15.5993 12.6919 15.205C13.5343 14.8106 14.2797 14.236 14.8755 13.5217C15.0335 13.3238 15.1076 13.0717 15.0819 12.8197C15.0562 12.5677 14.9327 12.3358 14.738 12.1738C14.5432 12.0118 14.2927 11.9326 14.0402 11.9533C13.7877 11.9739 13.5534 12.0927 13.3875 12.2842Z" fill="#C6CCD4" />
							</g>
							<defs>
								<clipPath id="clip0_6_37">
									<rect width="20" height="20" fill="white" />
								</clipPath>
							</defs>
						</svg>} placeholder="Your Name" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input.Password style={styles.input}
							prefix={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M9.61905 14.0108V15.9326C9.61905 16.1335 9.79576 16.2963 10 16.2963C10.2104 16.2963 10.381 16.1275 10.381 15.9326V14.0108C10.8248 13.8583 11.1429 13.4467 11.1429 12.963C11.1429 12.3493 10.6312 11.8519 10 11.8519C9.36882 11.8519 8.85714 12.3493 8.85714 12.963C8.85714 13.4467 9.17517 13.8583 9.61905 14.0108ZM4.28571 8.14816V5.55499C4.28571 2.48645 6.84409 0 10 0C13.1495 0 15.7143 2.48705 15.7143 5.55499V8.14816C16.9784 8.15167 18 9.14838 18 10.3774V14.0741C18 17.3402 15.2714 20 11.9054 20H8.09456C4.73232 20 2 17.3469 2 14.0741V10.3774C2 9.14043 3.02273 8.15164 4.28571 8.14816ZM6.57143 8.14815V5.55619C6.57143 3.71055 8.10645 2.22222 10 2.22222C11.8897 2.22222 13.4286 3.71489 13.4286 5.55619V8.14815H6.57143Z" fill="#C1C7D0" />
							</svg>}
							type="password"
							placeholder="Create Password"
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" style={{ display: "flex", marginBottom: "1px" }}>
							<Checkbox>I agree to the Terms & Conditions</Checkbox>
						</Form.Item>

					</Form.Item>
					<Form.Item style={{ marginBottom: "0px" }}>
						<Button disabled={isLoading} style={{ height: "38px" }} block={true} type="primary" htmlType="submit">
							 {isLoading ? "Signing up...." : "Sign Up"}
						</Button>
						<div style={styles.footer}>
							<Text style={styles.text}>Already have an account? </Text>{" "}
							
							<NavLink to={"/login"}><Link>Sign In</Link></NavLink>
						</div>
					</Form.Item>
				</Form>
			</div>
		</section>
	);
};

export default SignUp;
