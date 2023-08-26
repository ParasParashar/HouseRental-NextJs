import './globals.css'
import { Nunito } from 'next/font/google'
import type { Metadata } from 'next'
import getCurrentUser from './actions/getCurrentUser';
import Navbar from './components/navbar/Navbar';
import RegisterModle from './components/models/RegisterModle';
import LoginModel from './components/models/LoginModel';
import RentModel from './components/models/RentModel';
import ToasterProvider from './providers/ToasterProvider';
import SearchModel from './components/models/SearchModel';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AirBnb Clone',
  description: 'It is created by Typescript with Next-js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RegisterModle/>
        <LoginModel/>
        <RentModel/>
        <SearchModel/>
        <Navbar currentUser = {currentUser}/>
        <div className="pb-20 pt-20">
        {children}
        </div>
          
        </body>
    </html>
  )
}
