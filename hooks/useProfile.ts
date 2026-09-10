import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useProfile = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const response = await fetch('/api/users/profile');
      if (!response.ok) throw new Error('Error fetching profile');
      return response.json();
    },
    enabled: !!session,
  });
};

export const useUpdateProfile = () => {
  const queryClient = require('@tanstack/react-query').useQueryClient();

  return require('@tanstack/react-query').useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error updating profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
