import { useQuery } from 'react-query';

export function useQueryData(queryKey: any, queryFn: () => any, delay: number | undefined) {
  const fetchWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return queryFn();
  };

  return useQuery(queryKey, fetchWithDelay);
}

export async function fetchCustomers() {
  const res = await fetch('tableData.json', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function fetchCountry() {
  const res = await fetch('countryData.json', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return res.json();
}
