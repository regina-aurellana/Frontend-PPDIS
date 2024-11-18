import React from 'react'
import { Layout, theme, Avatar, Row, Col } from 'antd';
import { FaSignOutAlt, FaCaretDown, FaUserCog } from "react-icons/fa"
import { Dropdown, Space } from 'antd';
import {useNavigate} from "react-router-dom"
import { useAuth } from '../../context/auth';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const {user, logout} = useAuth();
	const {token: { colorBgContainer }} = theme.useToken();
      const items = [
        {
            key: '1',
            success: true,
            icon: <FaUserCog />,
            label: 'Account Settings',
            onClick: () => {
              navigate('/account-settings')
            },
        },
    
        {
          key: '2',
          danger: true,
          icon: <FaSignOutAlt />,
          label: 'Logout',
          onClick: () => {
            logout()
            navigate('/login')
          },
        },
      ];
  
  return (
    <Header style={{ background: colorBgContainer }}>
         <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Dropdown menu={{ items }} >
                    <a style= {{color:'#000'}} onClick={(e) => e.preventDefault()}>
                        <Space  className="navbar-settings">
                        {user.name}
                            <FaCaretDown />
                        </Space>
                    </a>
                </Dropdown>  

        </Row>

       
    </Header>
  )
}

export default Navbar