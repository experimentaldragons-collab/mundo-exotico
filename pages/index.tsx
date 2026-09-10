import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Mundo Exótico - Marketplace de Animales Exóticos</title>
        <meta name="description" content="Compra y vende animales exóticos de forma segura en Mundo Exótico" />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">
                Bienvenido a Mundo Exótico
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                El marketplace más confiable para comprar y vender animales exóticos en Latinoamérica.
                Conectamos apasionados con los mejores animales del mundo.
              </p>
              <div className="flex gap-4">
                {session ? (
                  <>
                    <Link
                      href="/listings"
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Explorar Anuncios
                    </Link>
                    <Link
                      href="/dashboard"
                      className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Mi Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Comenzar Ahora
                    </Link>
                    <Link
                      href="/auth/login"
                      className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🦎</div>
              <p className="text-gray-600">Animales exóticos verificados y seguros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            ¿Por qué elegir Mundo Exótico?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Verificado y Seguro</h3>
              <p className="text-gray-600">
                Todos los vendedores y animales son verificados por nuestro equipo de expertos.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cobertura Latinoamericana</h3>
              <p className="text-gray-600">
                Operamos en México, Colombia, Venezuela, Ecuador, Perú, Chile y Argentina.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Soporte Dedicado</h3>
              <p className="text-gray-600">
                Nuestro equipo está disponible 24/7 para ayudarte con cualquier pregunta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">Únete a miles de apasionados por los animales exóticos</p>
          {!session && (
            <Link
              href="/auth/register"
              className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Crear Cuenta Gratis
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
