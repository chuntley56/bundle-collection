import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import BundleCollection from '../components/BundleCollection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <BundleCollection />
    </div>
  )
}
