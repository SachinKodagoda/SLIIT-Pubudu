/* eslint-disable @next/next/no-page-custom-font */
import { AnimationContextProvider } from '@ctx/AnimationContext';
import { AudioContextProvider } from '@ctx/AudioContext';
import '@styles/globals.sass';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'regenerator-runtime/runtime';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>{process.env.APP_NAME}</title>
        <meta
          name='viewport'
          content='width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no, shrink-to-fit=no'
        />
        <meta name='author' content='Duminda Kodagoda' />
        <meta name='keywords' content='Davinci Arts' />
        <meta name='description' content='Art for everyone' />
        <meta name='theme-color' content='#000' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link href='https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap' rel='stylesheet' />
      </Head>
      <AudioContextProvider>
        <AnimationContextProvider>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </AnimationContextProvider>
      </AudioContextProvider>
    </>
  );
};
export default MyApp;
