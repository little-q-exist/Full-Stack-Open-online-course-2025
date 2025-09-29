import { useContext } from "react";

export const useContextValue = (context) => {
    const valueAndDispatch = useContext(context)
    return valueAndDispatch[0]
}

export const useContextDispatch = (context) => {
    const valueAndDispatch = useContext(context)
    return valueAndDispatch[1]
}