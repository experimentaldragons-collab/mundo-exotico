import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useSeller = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['seller', session?.user?.id],
    queryFn: async () => {
      const response = await fetch('/api/sellers');
      if (!response.ok) throw new Error('Error fetching seller');
      return response.json();
    },
    enabled: !!session && session.user?.isSeller,
  });
};

export const useCreateSeller = () => {
  const queryClient = require('@tanstack/react-query').useQueryClient();

  return require('@tanstack/react-query').useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error creating seller');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller'] });
    },
  });
};
