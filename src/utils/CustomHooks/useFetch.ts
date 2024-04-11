import { useEffect, useState } from "react"

export default function useFetch(url: string){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch(url);
                    setData(await response.json());
                }catch(e: any){
                    setError(e);
                }finally{
                    setLoading(false);
                }
            }
        )()
    }, [url]);

    return { data, error, loading }

}