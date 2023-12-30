/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import React from 'react';

const Menu = () => {
  const { pathname } = useLocation();
  return pathname;
};

const App = (): JSX.Element => (
  <>
    <div>{Menu()}</div>
    <div>
      <Link to="/">/</Link>
    </div>
    <div>
      <Link to="/live">/live</Link>
    </div>
    <div>
      <Link to="/marketing">/marketing</Link>
    </div>
    <button
      type="button"
      onClick={() => {
        window.Garfish.router.push({ path: '/sub2' });
      }}
    >
      去其它子应用 /sub2
    </button>
    <Routes>
      <Route path="/live" element={<div>直播中心</div>} />
      <Route path="/marketing" element={<div>营销</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </>
);

export default (props: { basename: string }) => (
  <div style={{ border: '1px solid black' }}>
    <div>我是子应用，我接受了主应用的 props</div>
    <div style={{ border: '1px pink' }}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    <BrowserRouter basename={props.basename}>
      <App />
    </BrowserRouter>
  </div>
);
