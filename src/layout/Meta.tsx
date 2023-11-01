import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '../utils/AppConfig';
import Script from 'next/script';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta
          name="google-site-verification"
          content="oz7CZNIsOcroP2XMkWaIqkbDaAZemiEuJcPDHM6Rb9o"
        />
        <link
          rel="apple-touch-icon"
          // href={`${router.basePath}/apple-touch-icon.png`}
          href={`${router.basePath}/favicon.ico`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          // href={`${router.basePath}/favicon-32x32.png`}
          href={`${router.basePath}/favicon.ico`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          // href={`${router.basePath}/favicon-16x16.png`}
          href={`${router.basePath}/favicon.ico`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=REM:wght@400;700&display=swap"
        />
      </Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-5M3RGH282N"
      ></script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5M3RGH282N');
              `,
        }}
      />
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
