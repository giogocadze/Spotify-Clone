"use client"
import qs from "query-string"
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Input from "../Input/Input";
import styles from "./SearchInput.module.css"

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debounceValue = useDebounce<string>(value, 450);

    useEffect(() => {
        const query = {
            title: debounceValue,
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        })
        router.push(url)
    }, [debounceValue, router])
    return (
        <Input
            className={styles.input}
            placeholder="What do you want to listen to ?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default SearchInput
