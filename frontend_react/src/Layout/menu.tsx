import React, { FC, useEffect, useState } from 'react';
import * as Icons from '@ant-design/icons';
import type { GetProp, MenuProps } from 'antd';
import { Menu } from 'antd';
// import { useAppDispatch, useAppSelector } from '@/store';
// import { collapse, updateCollapsed } from '@/stores/module/menu';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { dynamicMenuRoute } from '@/router/routeList/dynamicRoute';
import { MenuList, MenuItem } from '@/router/type';

type MenuItems = GetProp<MenuProps, 'items'>[number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItems[],
  type?: 'group'
): MenuItems {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItems;
}
interface MenuCProps {
  menuList: MenuList;
}
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
  return React.createElement(customIcons[name]);
};
// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值

const MenuComponent: FC<MenuCProps> = ({ menuList }) => {
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const collapsedApp = useAppSelector(collapse);
  const [activeMenu, setActiveMenu] = useState<string[]>([]);
  //用本地存储管理主要是因为收缩菜单栏需要
  const openKey = JSON.parse(localStorage.getItem('openKeys') as string);
  const [openKeys, setOpenKeys] = useState<string[]>(openKey ? openKey : []);

  //当手动输入路由路由表发生变化时，将路由对应的sub展开，其他的隐藏
  const deepLoopFloat = (menuList: MenuList, newArr: MenuItems[] = []) => {
    menuList.forEach((item: MenuItem) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) return newArr.push(getItem(item.name, item.path, addIcon(item?.meta.icon)));
      newArr.push(getItem(item.name, item.path, addIcon(item?.meta?.icon), deepLoopFloat(item.children)));
    });
    return newArr;
  };
  const items: MenuItems[] = deepLoopFloat(menuList);
  useEffect(() => {
    setActiveMenu([]);
  }, []);
  // useEffect(() => {
  //   // 直接监听路由变化
  //   if (pathname.split('/').length > 2) {
  //     const timer = setTimeout(() => {
  //       localStorage.setItem('openKeys', JSON.stringify([pathname.split('/')[1]]));
  //       setOpenKeys(prev => [pathname.split('/')[1]]);
  //       setActiveMenu([pathname]);
  //     }, 100);
  //     return () => clearTimeout(timer);
  //   } else {
  //     const timer = setTimeout(() => {
  //       const item = menuList.find((item, index) => index === 1);

  //       localStorage.setItem('openKeys', JSON.stringify([item?.path]));
  //       setOpenKeys([item?.path as string]);
  //       setActiveMenu([pathname]);
  //     }, 100);
  //     return () => clearTimeout(timer);
  //   }
  // }, [pathname]);

  //当点击SubItem时需要展开菜单，如果点击第二个subItem需要同时展开两个，如果在点击MenuItem，就需要将上一个SubItems收缩
  const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
    //获取点击的subKey

    if (openKeys.length === 0 || openKeys.length === 1) {
      localStorage.setItem('openKeys', JSON.stringify(openKeys));
      setOpenKeys(openKeys);
    } else {
      localStorage.setItem('openKeys', JSON.stringify(openKeys));
      setOpenKeys(openKeys);
    }
  };
  const toPage = () => {
    // if (key) {
    //   //分割路由 /business/goods ['','business','goods'],
    //   //如果当前路由和subItem key匹配就将openKey赋值为当前路由对应的sub,其他的隐藏,如果跳转页面为首页默认展开体检管理
    //   const splitKey = key.split('/');
    //   if (splitKey.length > 2) {
    //     const openKey = JSON.parse(localStorage.getItem('openKeys') as string);
    //     const flag = openKey.some((item: string) => item === splitKey[1]);
    //     if (flag) {
    //       localStorage.setItem('openKeys', JSON.stringify([splitKey[1]]));
    //       setOpenKeys([splitKey[1]]);
    //     }
    //   } else {
    //     const item = menuList.find((item, index) => index === 1);
    //     localStorage.setItem('openKeys', JSON.stringify([item?.path]));
    //     setOpenKeys([item?.path as string]);
    //   }
    // }
    // navigate(key);
  };

  return (
    <Menu
      mode="inline"
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      selectedKeys={activeMenu}
      onClick={toPage}
      items={items}
    />
  );
};

export default MenuComponent;
