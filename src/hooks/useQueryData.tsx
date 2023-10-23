import { useQuery } from 'react-query';

export function useQueryCustomers() {
    return useQuery({queryKey: ["customers"], 
        queryFn:  async () => {
        const response = await fetch("tableData.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return data;
    }
});
}

export function useQueryCountry() {
    return useQuery({queryKey: ["country"], 
        queryFn:  async () => {
        const response = await fetch("countryData.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return data;
    }
});
}