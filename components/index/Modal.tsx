import { useEffect } from "react";
import { memo, ReactElement, ReactNode, forwardRef, useImperativeHandle, useState, MutableRefObject } from "react"
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from '../../styles/DragAndDrop.module.css'
import classNames from 'classnames';

export type ModalHandleType = {
    closeModal: () => void;
    openModal: () => void;
};

export interface ModalProps {
    ref:MutableRefObject<ModalHandleType>,
    title:string,
    children:ReactNode,
    show:boolean,
    onClose?:()=>void
}


export const  ModalD = forwardRef(({title,children,show=false, onClose}:ModalProps, ref):ReactElement => {
    
    const [showModal, setShowModal] = useState(show)
    const [showing, setShowing] = useState(true)
    const [showingTimeout, setShowingTimeout] = useState<NodeJS.Timeout>()


    const closeModal = () => {
        onClose?.()
        toggleModal(false)
    }

    const toggleModal = (status:boolean) => {
        clearTimeout(showingTimeout)

        setShowing(status)
        if(status){
            setShowModal(status)
        }
        else{
            setShowingTimeout(setTimeout(() => {
                setShowModal(status)
            },900))
        }
    }

    

    useEffect(() => {
        setShowModal(show)
    },[show])

    useImperativeHandle(ref,() => ({
        closeModal,
        openModal(){
            toggleModal(true)
        }
    }),[])

    
    console.log('Modal render', showModal, show)
    return (
        <>
            {
                showModal && <div className={classNames(["fixed z-10 top-0 left-0 w-full h-[100vh] bg-slate-400/90 m-0 flex justify-center items-center",{[styles.FadeIn]: showing,[styles.FadeOut]: !showing}])}>
                            <div className="w-[500px] h-[500px] bg-slate-200">
                                <div className="border-b-2 p-3 bg-red-300 border-b-slate-500 w-[inherit] pb-2 text-sm relative flex font-bold">
                                    <span className="flex-1">{title}</span>
                                    <span className="hover:cursor-pointer" onClick={closeModal}><AiOutlineCloseCircle /></span>
                                </div>
                                
                                <div className="p-3">
                                    {children}
                                </div>
                            </div>
                        </div>
            }
        </>
    )
})

export default memo(ModalD)