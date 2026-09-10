import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useListings = (filters?: any) => {
  const queryParams = new URLSearchParams(filters || {});

  return useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      const response = await fetch(`/api/listings?${queryParams}`);
      if (!response.ok) throw new Error('Error fetching listings');
      return response.json();
    },
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error creating listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};
