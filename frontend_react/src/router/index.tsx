import { FC, lazy, useEffect } from 'react';
import { useLocation, type RouteObject, useNavigate } from 'react-router-dom';
import type { MenuList } from './type';
import WrapperRouteComponent from './WrapperRoute';
import LayoutPage from '@/Layout';
import RenderRoute from './RenderRoute';
import Storage from '@/utils/Storage';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';

const NotFound = lazy(() => import('@/views/error/index'));
const LoginPage = lazy(() => import('@/views/login'));
const Dashboard = lazy(() => import('@/views/dashboard'));

const defaultRouteList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} />
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} />
  }
];

const errorRoute: RouteObject[] = [
  {
    path: '*',
    element: <WrapperRouteComponent element={<NotFound />} />
  }
];

//默认菜单
export const defaultMenuRoutes: MenuList = [
  {
    path: '/dashboard',
    key: '/dashboard',
    element: <WrapperRouteComponent element={<Dashboard />} />,
    meta: {}
  }
];

export const DynamicRouter: FC = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const token = Storage.get(ACCESS_TOKEN_KEY, null);

  //判断token鉴权
  useEffect(() => {
    if (!token && pathname !== '/login') {
      return navigate({ pathname: '/login' }, { replace: true, state: { from: pathname } });
    }
    if (token) {
      if (pathname === '/login') {
        return navigate({ pathname: '/' }, { replace: true });
      }
    }
  }, [pathname, state, token, navigate]);

  // const newRoutes = useMemo(() => {
  //   const routes = cloneDeep(defaultRouteList);
  //   const layoutRoute = routes.find(item => item.path === '/')?.children;
  //   layoutRoute?.push(...cloneDeep([...defaultMenuRoutes, ...menuList]), ...errorPages);
  //   return routes;
  // }, [menuList]);
  const newRoutes = [...defaultMenuRoutes, ...errorRoute, ...defaultRouteList];
  return <RenderRoute routeList={newRoutes} />;
};
export default DynamicRouter;
