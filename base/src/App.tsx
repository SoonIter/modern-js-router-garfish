import { useModuleApps } from '@modern-js/plugin-garfish/runtime';
import { Route } from '@modern-js/runtime/router';
import { Suspense } from 'react';
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  matchPath,
  useHref,
  useLocation,
  useMatches,
} from 'react-router-dom';

const App = (): JSX.Element => {
  const basename = useHref('/');
  const { pathname } = useLocation();
  const { apps } = useModuleApps();

  return (
    <>
      <div>
        base current basename: <pre>{basename}</pre>
        base current pathname: <pre>{pathname}</pre>
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
        <Link to={'/sub'}>{'/sub'}</Link>
      </div>
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

const MicroApp = () => {
  const { apps } = useModuleApps({
    useHref,
    useLocation,
    useMatches,
    useRouteMatch: null,
  });
  const { pathname } = useLocation();

  const Comp = apps.find(app => {
    const x = matchPath('/sub/*', pathname);
    if (x?.pathnameBase === app.activeWhen) {
      return app.Component;
    }
    return false;
  })?.Component;

  return Comp ? <Comp /> : <></>;
};

export default () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={App} errorElement={<div>错误</div>}>
        {/* {microElements} */}
        <Route path="/sub/*" Component={MicroApp} />
        <Route path="*" element={<div>404</div>} />
      </Route>,
    ),
    { basename: '/jdc' },
  );

  return <RouterProvider router={router} />;
};
