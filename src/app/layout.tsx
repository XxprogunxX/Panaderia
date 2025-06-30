// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panadería El Pan de Cada Día",
  description: "Panadería tradicional con más de 30 años de experiencia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Manejar errores de message channel
              window.addEventListener('error', function(event) {
                if (event.error && event.error.message && 
                    event.error.message.includes('message channel closed')) {
                  console.warn('Message channel error handled:', event.error.message);
                  event.preventDefault();
                  return false;
                }
              });

              // Manejar promesas rechazadas relacionadas con message channels
              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && event.reason.message && 
                    event.reason.message.includes('message channel closed')) {
                  console.warn('Unhandled message channel rejection handled:', event.reason.message);
                  event.preventDefault();
                  return false;
                }
              });

              // Limpiar listeners al cerrar la página
              window.addEventListener('beforeunload', function() {
                // Limpiar cualquier listener pendiente
                if (window.messageChannelCleanup) {
                  window.messageChannelCleanup();
                }
              });
            `
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
