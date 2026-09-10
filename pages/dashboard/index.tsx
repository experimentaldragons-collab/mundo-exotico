import React, { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Mundo Exótico</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Bienvenido, {session?.user?.username}!
            </h1>
            <p className="text-gray-600 mt-2">{session?.user?.email}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium">Mis Anuncios</h3>
              <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
              <p className="text-gray-500 text-sm mt-2">Activos</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium">Mensajes</h3>
              <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
              <p className="text-gray-500 text-sm mt-2">No leídos</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-medium">Transacciones</h3>
              <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
              <p className="text-gray-500 text-sm mt-2">Completadas</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/dashboard/listings/new"
                className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="text-2xl mb-2">📋</div>
                <div className="font-medium">Crear Anuncio</div>
                <p className="text-sm text-gray-600 mt-1">Publica un nuevo animal o producto</p>
              </a>
              <a
                href="/dashboard/messages"
                className="p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-2xl mb-2">💬</div>
                <div className="font-medium">Mensajes</div>
                <p className="text-sm text-gray-600 mt-1">Revisa tus conversaciones</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
