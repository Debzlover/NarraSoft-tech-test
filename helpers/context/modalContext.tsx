import { ChangeEvent, createContext, MutableRefObject, ReactElement, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"
import Modal,{ModalD, ModalHandleType } from "../../components/index/Modal"


export interface ModalProps {
    title:string,
    children:ReactNode,
    show:boolean,
    onClose?:()=>void
}

export const useModalContext = () => {

    const modelRef = useRef<ModalHandleType>()

    const ModalD = useCallback(({title,children,show=false, onClose}:ModalProps):ReactElement => {
        return <Modal ref={modelRef} title={title} show={show} onClose={onClose}>
                {children}
            </Modal>
    },[])


    return {
        modelRef,
        ModalD
    }
}

interface ModalContextType {
    modelRef: MutableRefObject<ModalHandleType|undefined>;
    ModalD: ({ title, children, show, onClose }: ModalProps) => ReactElement;
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export const ModalContextProvider = ({children}:{children:ReactNode}) => {
    return <ModalContext.Provider value={useModalContext()}>
        {children}
    </ModalContext.Provider>
}


export const useModalContextState = () => {
    const modalcontext = useContext(ModalContext)
    return modalcontext
}
