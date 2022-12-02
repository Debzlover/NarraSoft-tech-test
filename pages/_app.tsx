import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxProvider from '../components/generic/ReduxProvider'
import { ModalContextProvider } from '../helpers/context/modalContext'
import { DropedToolProvider } from '../helpers/context/dropedToolsContext'

// temporary disable all logs
console.log = () => {}
console.warn = () => {}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <DropedToolProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </DropedToolProvider>
    </ReduxProvider>
  )
}
