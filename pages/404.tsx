import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página no encontrada | Mundo Exótico</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
          <p className="text-gray-600 mb-8">Lo sentimos, la página que buscas no existe.</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
