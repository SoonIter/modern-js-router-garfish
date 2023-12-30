import { Body, Head, Html, Root } from '@modern-js/runtime/document';
import type { ReactElement } from 'react';
import React from 'react';

export default (): ReactElement => (
  <Html>
    <Head>
      <meta charSet="utf-8" />
      <title>主应用</title>
      <link
        rel="icon"
        href="https://p3.dcarimg.com/img/tos-cn-i-dcdx/b59096934d7344eda658d8aa012f531f~noop.png"
        type="image/x-icon"
      />
      <link rel="dns-prefetch" href="//p3.dcarimg.com/" />
      <link rel="dns-prefetch" href="//lf3-motor.dcarstatic.com/" />
      <meta name="screen-orientation" content="portrait" />
      <meta name="x5-orientation" content="portrait" />
      <meta name="format-detection" content="telephone=no" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1, minimal-ui, viewport-fit=cover"
      />
    </Head>
    <Body>
      <Root rootId="root" />
    </Body>
  </Html>
);
