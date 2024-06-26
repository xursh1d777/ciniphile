import axios from "axios"
import { useEffect, useState } from "react"


function useGetData(path,watch) {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
        function getData() {
            setLoading(true)
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${import.meta.env.VITE_DB_TOKEN}`
                }
              };
              fetch(`https://api.themoviedb.org/3/${path}?language=ru-Ru`, options)
                .then(response => response.json())
                .then(response => {
                    setData(response)
                    setLoading(false)
                })
                .catch(err => {
                    setError(err)
                    setLoading(false)
                });
        }
        useEffect(()=>{
            getData()
        },[watch])
  return [data,loading,error]
}

export default useGetData