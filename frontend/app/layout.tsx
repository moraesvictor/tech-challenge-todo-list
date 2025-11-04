import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@shared/components/Toast";
import { ModalProvider } from "@shared/components/Modal";

export const metadata: Metadata = {
  title: "Minhas Tarefas - Desafio Técnico",
  description: "Aplicação de gerenciamento de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-50">
        <ToastProvider>
          <ModalProvider>
            <main className="min-h-screen py-8 px-4">
              <div className="max-w-4xl mx-auto ">
                <header className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Minhas Tarefas
                  </h1>
                  <p className="text-gray-600">
                    Organize suas tarefas de forma simples e eficiente
                  </p>
                </header>
                {children}
              </div>
            </main>
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
