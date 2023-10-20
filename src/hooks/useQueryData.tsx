import { useQuery } from 'react-query';

export function useQueryData(queryKey: any, queryData: string, delay: number | undefined) {
    const fetchData = async () => {
        const response = await fetch(queryData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, delay));
        return data;
    };

    return useQuery({queryKey: queryKey, queryFn: fetchData});
}