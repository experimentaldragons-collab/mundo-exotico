import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useConversations = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['conversations', session?.user?.id],
    queryFn: async () => {
      const response = await fetch('/api/conversations');
      if (!response.ok) throw new Error('Error fetching conversations');
      return response.json();
    },
    enabled: !!session,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`);
      if (!response.ok) throw new Error('Error fetching messages');
      return response.json();
    },
    enabled: !!conversationId,
    refetchInterval: 3000, // Refetch every 3 seconds
  });
};

export const useSendMessage = () => {
  const queryClient = require('@tanstack/react-query').useQueryClient();

  return require('@tanstack/react-query').useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error sending message');
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
