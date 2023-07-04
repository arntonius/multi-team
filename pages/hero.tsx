import Head from 'next/head'
import styles from '/styles/pages/index.module.scss'
import Homepage from 'components/organisms/homepage'

export default function WithTracker({}) {
  return (
    <>
      <Head>
        <title>SEVA - Beli Mobil Terbaru Dengan Cicilan Kredit Terbaik</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.wrapperSecondary}>
          <Homepage />
        </div>
      </main>
    </>
  )
}
