import { ReactElement, ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "../../redux/store"


export default function ReduxProvider({ children }: { children: ReactNode }):ReactElement {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}