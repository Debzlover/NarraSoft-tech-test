import { ChangeEvent, createContext, MutableRefObject, ReactElement, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import Modal,{ModalD, ModalHandleType } from "../../components/index/Modal"
import { RootState } from "../../redux/store"
import {DropControlStateType, DropedControl, DropToolList} from '../../helpers/types/index/dragNDropTypes'

export const useDropToolsContext = () => {
    const dropToolsRef = useRef<DropToolList>({})
    const get = useCallback(() => dropToolsRef.current,[])
    const set = useCallback((tool:DropedControl) => {
        if(!dropToolsRef.current)
            dropToolsRef.current = {}
        
        dropToolsRef.current![tool.id] = tool
        Subscribers.current.forEach(callback => callback())
    },[])

    const remove = useCallback((id:string) => {
        if(!dropToolsRef.current)
            dropToolsRef.current = {}
        
        delete dropToolsRef.current![id]
        updateListReference()
    },[])

    const updateListReference  = () => {
        dropToolsRef.current = {...dropToolsRef.current}
        Subscribers.current.clear()

        ListSubscribers.current.forEach(callback => callback())
    }

    const registerTool = useCallback((tool:DropedControl) => {
        dropToolsRef.current![tool.id] = tool
        updateListReference()
    },[])

    const Subscribers =  useRef(new Set<() => void>())
    const subscribe = useCallback((callback: () => void)=> {
        Subscribers.current.add(callback)
        return () => Subscribers.current.delete(callback)
    },[])

    const ListSubscribers =  useRef(new Set<() => void>())
    const listSubscribe = useCallback((callback: () => void)=> {
        ListSubscribers.current.add(callback)
        return () => ListSubscribers.current.delete(callback)
    },[])

    return {
        get,
        set,
        subscribe,
        registerTool,
        listSubscribe,
        remove
    }
}

interface DropToolContextType {
    get: () => {
        [key: string]: DropedControl;
    };
    set: (tool: DropedControl) => void;
    subscribe: (callback: () => void) => () => boolean;
    registerTool: (tool: DropedControl) => void;
    listSubscribe: (callback: () => void) => () => boolean;
    remove: (id:string) => void;
}

const DropedToolContext = createContext<DropToolContextType>({} as DropToolContextType)

export const DropedToolProvider = ({children}:{children:ReactNode}) => {
    return <DropedToolContext.Provider value={useDropToolsContext()}>
        {children}
    </DropedToolContext.Provider>
}

export const useDropToolSelector = (selector:(state:DropToolList) => DropedControl) : [DropedControl, (tool:DropedControl) => void, () => void] => {
    const context = useContext(DropedToolContext)
    const [toolData, setToolData] = useState<DropedControl>(selector(context.get()))

    const remove = useCallback(() => {
        context.remove(toolData.id)
    }, [])

    useEffect(() => {
        context.subscribe(() => {
            setToolData(selector(context.get()))
        })
    },[])
    return [toolData, context.set, remove]
}


export const useDropTools = () : [DropToolList, (payload: DropedControl) => void] => {
    const context = useContext(DropedToolContext)
    const [toolsList, setToolList] = useState<DropToolList>(context.get())
    
    const registerTool = useCallback((tool:DropedControl) => {
        context.registerTool(tool)
    },[])

    useEffect(() => {
        context.listSubscribe(() => {
            setToolList(context.get())
        })
    },[])
    return [toolsList, registerTool]
}
