import { useModuleApps } from '@modern-js/plugin-garfish/runtime';
import { Route } from '@modern-js/runtime/router';
import { Suspense, useEffect, useMemo } from 'react';
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useHref,
  useLocation,
} from 'react-router-dom';

const App = (): JSX.Element => {
  const { apps } = useModuleApps();
  const basename = useHref('/');
  const { pathname } = useLocation();
  useEffect(() => {
    window.Garfish.run();
  }, []);

  return (
    <>
      <div>
        current basename: <pre>{basename}</pre>
        current pathname: <pre>{pathname}</pre>
      </div>
      <div>
        <Link to={'/'}>{'/'}</Link>
      </div>
      {apps.map(app => (
        <div key={app.name}>
          <Link to={app.activeWhen as string}>{app.activeWhen as string}</Link>
        </div>
      ))}
      <div>
        <Link to={'/sub/live'}>{'/sub/live'}</Link>
      </div>
      <pre>{JSON.stringify(apps, null, 2)}</pre>
      <Suspense fallback={<div>error</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default () => {
  const { apps = [] } = useModuleApps();
  const AppElements = useMemo(() => {
    return apps.map(app => {
      const { Component } = app;
      // 模糊匹配，path 需要写成类似 abc/* 的模式
      return (
        <Route
          key={app.name}
          path={`${app.name.toLowerCase()}/*`}
          element={<Component />}
        />
      );
    });
  }, [apps]);
  console.log(apps, 'apps');

  // 使用的不是 MApp 组件，需要使用 createBrowserRouter 来创建路由
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<div>错误</div>}>
        {AppElements}
        <Route path="*" element={<div>404</div>} />
      </Route>,
    ),
    { basename: '/jdc' },
  );

  return (
    // 方法一：使用 MApp 自动根据配置的 activeWhen 参数加载子应用(本项目配置在 modern-js.config.ts 中)
    // <BrowserRouter basename="/jdc">
    //   <MApp />
    // </BrowserRouter>

    // 方法二：手动写 Route 组件方式加载子应用，方便于需要鉴权等需要前置操作的场景
    <>
      <RouterProvider router={router} />
    </>
  );
};
