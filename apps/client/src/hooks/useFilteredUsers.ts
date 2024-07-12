import { useQuery } from '@tanstack/react-query';
import { FilterGroup, User } from '../types';

const fetchFilteredUsers = async (filter: FilterGroup): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/api/users/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const key = 'filteredUsers';

export const useFilteredUsers = (filter: FilterGroup | null) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => {
      if (filter) {
        return fetchFilteredUsers(filter);
      }
      return [];
    },
    enabled: false,
  });
};
