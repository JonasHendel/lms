import '@/styles/global.scss';

import Layout from '@/components/Layout';

import store from '@/store/store';
import { Provider } from 'react-redux';

// Create a liveblocks client


function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </>
  );
}

export default MyApp;
