import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxProvider from '../components/generic/ReduxProvider'
import { ModalContextProvider } from '../helpers/context/modalContext'

// temporary disable all logs
console.log = () => {}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ModalContextProvider>
        <Component {...pageProps} />
      </ModalContextProvider>
    </ReduxProvider>
  )
}
