import { FC } from 'react';
import './index.less';
import { Tabs } from 'antd';
import Info from './components/info';
import Account from './components/account';
import Notice from './components/notice';
const Profile: FC = () => {
  const items = [
    { key: '1', label: '个人信息', children: <Info /> },
    { key: '2', label: '消息通知', children: <Notice /> },
    { key: '3', label: '账号密码', children: <Account /> }
  ];
  return (
    <div className="profile">
      <Tabs tabPosition="left" items={items} />
    </div>
  );
};
export default Profile;
