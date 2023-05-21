import Head from 'next/head';

const CommonMeta = ({
  title = 'AIおもしろ診断',
  keywords = 'AIおもしろ診断, チャットGPT, Chat GPT, AI診断, 診断, SNS, ネタ',
  description = '「AIおもしろ診断」は、いま話題のチャットGPT AIが答える診断サイトです！名前を送信するだけでAIがお題にあった診断結果を回答するよ！友達とシェアして盛り上がろう！',
  ogType = 'website',
}) => {
  return (
    <Head>
      <title>{'AIおもしろ診断'}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={'AIおもしろ診断'} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/ogp.jpg`} />
      <meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`} />
      <meta property="og:site_name" content={'AIおもしろ診断'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={'AIおもしろ診断'} />
      <meta
        name="twitter:description"
        content={
          '「AIおもしろ診断」は、いま話題のチャットGPT AIが答える診断サイトです！名前を送信するだけでAIがお題にあった診断結果を回答するよ！友達とシェアして盛り上がろう！'
        }
      />
      <meta name="twitter:image" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/ogp-twitter.jpg`} />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
  );
};
export default CommonMeta;
