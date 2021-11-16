import { useEffect, useState } from "react"

const getFromLocalStorage = <T>(key: string, defaultValue: T) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value): defaultValue;
} 

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [data, setData] = useState<T>(getFromLocalStorage<T>(key, defaultValue))

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(data))
    }, [data])

    return {data, setData}
}