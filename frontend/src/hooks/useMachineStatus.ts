import { useQuery } from '@tanstack/react-query';
import { fetchMachineStatus, type MachineStatus } from '@/controller/statusClient';
import { useConnectionStore } from '@/state/connectionStore';

export function useMachineStatus() {
  const { httpUrl } = useConnectionStore();

  const query = useQuery<MachineStatus>({
    queryKey: ['machineStatus'],
    queryFn: fetchMachineStatus,
    enabled: !!httpUrl,
    refetchInterval: 2000,
    retry: false,
  });

  return {
    status: query.data,
    isLoading: query.isLoading,
    error: query.error,
    lastUpdated: query.data ? new Date(query.data.timestamp) : new Date(),
  };
}
