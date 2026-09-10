import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Layout({
  children,
  title = 'Mundo Exótico',
  description = 'Marketplace de animales exóticos',
  className = '',
}: LayoutProps) {
  const router = useRouter();
  const fullTitle = title === 'Mundo Exótico' ? title : `${title} | Mundo Exótico`;
  const url = `https://mundoexotico.com${router.asPath}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mundo Exótico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={url} />
      </Head>
      <div className={`min-h-screen flex flex-col ${className}`}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
