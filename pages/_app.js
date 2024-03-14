import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {

  return <>
    <Head>
      <title>NextJs PWA App</title>

    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp
