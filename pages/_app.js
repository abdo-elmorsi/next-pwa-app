import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout'
import { usePathname } from 'next/navigation'

function MyApp({ Component, pageProps }) {
  const pathname = usePathname()

  return <>
    <Head>
      <title>NextJs PWA App</title>

    </Head>
    {pathname == "/login" ? <Component {...pageProps} /> : <Layout>
      <Component {...pageProps} />
    </Layout>}
  </>
}

export default MyApp
