import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </body>
    </html>
  );
}
