import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/header/logo.png';
import UserAvatar from '@/assets/header/avatar.jpg';
import { Layout, Avatar, Dropdown, message, Badge } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { user_name, loginOut, avatarUrl } from '@/store/module/login';
import { getNoticeList } from '@/api/system/user';
// import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
// import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
// import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
// import AntdSvg from '@/assets/logo/antd.svg';
// import ReactSvg from '@/assets/logo/react.svg';
// import { useLocale } from '@/locales';
// import { userStore } from '@/stores/user';

// import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  // const { name, locale } = userStore;
  const [messageApi, contextHolder] = message.useMessage();
  const [count, setCount] = useState<any>([]);
  const getMessages = useCallback(async () => {
    const message = await getNoticeList();
    setCount(message.length);
  }, []);
  useEffect(() => {
    getMessages();
  }, [getMessages]);
  const navigate = useNavigate();
  // const { formatMessage } = useLocale();
  const username = useAppSelector(user_name);
  const headImg = useAppSelector(avatarUrl);
  const dispatch = useAppDispatch();
  // const selectLocale = ({ key }: { key: any }) => {
  //   userStore.setLocale(key);
  // };
  const goToDetailPage = () => {
    navigate({ pathname: '/system/profile' });
  };
  const logout = async () => {
    await dispatch(loginOut());
    messageApi.open({ type: 'success', content: '退出成功', duration: 0.5 }).then(() => {
      navigate('/login');
    });
  };
  const items: MenuProps['items'] = [
    {
      label: (
        <div onClick={goToDetailPage}>
          <UserOutlined />
          <span style={{ marginLeft: '3px' }}>个人详情</span>
        </div>
      ),
      key: '0'
    },
    {
      type: 'divider'
    },

    {
      label: (
        <div onClick={logout}>
          <LogoutOutlined />
          <span style={{ marginLeft: '3px' }}>退出登录</span>
        </div>
      ),
      key: '2'
    }
  ];
  return (
    <Header className="layout-page-header">
      {contextHolder}
      <div className="logo">
        <img src={Logo} alt="" style={{ marginRight: collapsed ? '2px' : '5px' }} />
        {!collapsed && <span>Tutor System</span>}
      </div>
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: '20px' }} />
            )}
          </span>
        </div>
        <div className="actions">
          {/* <HeaderNoticeComponent /> */}
          <div className="">
            <Badge count={count} size="small">
              <BellOutlined />
            </Badge>
          </div>

          {/* <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={selectLocale}>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'zh_CN'} key="zh_CN">
                  <ZhCnSvg /> 简体中文
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'en_US'} key="en_US">
                  <EnUsSvg /> English
                </Menu.Item>
              </Menu>
            }
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown> */}
          <div>
            <Dropdown menu={{ items }} trigger={['hover']}>
              <span className="user-avatar">{headImg ? <Avatar src={headImg} /> : <Avatar src={UserAvatar} />}</span>
            </Dropdown>
            <span className="user-name">{username}</span>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default memo(HeaderComponent);
