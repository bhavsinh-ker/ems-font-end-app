import { useRouter } from 'next/router'
import "../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../public/assets/css/sb-admin-2.min.css";
import Layout from "../components/layout";
import emsContext from '../context';
import { useState } from 'react';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

  const [alertData, setAlertData] = useState([]);
  
  const router = useRouter();  
  if(router.pathname != "/login") {
    return (
      <emsContext.Provider value={{
        alertData,
        setAlertData
      }}>
        <Head>
          <title>EMS</title>
          <script src="/assets/vendor/jquery/jquery.min.js" async />
          <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
          <script src="/assets/js/sb-admin-2.min.js" defer />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </emsContext.Provider>
    )
  } else {
    return (
      <Component {...pageProps} />
    )
  }
}

export default MyApp
