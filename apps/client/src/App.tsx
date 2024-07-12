import React, { useState } from 'react';

import SearchQueryBuilder from './lib/search-query-builder/SearchQueryBuilderForm';
import { useFilteredUsers } from './hooks/useFilteredUsers';
import { FilterGroup } from './types';
import Table from './components/Table';

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterGroup | null>(null);
  const { data, refetch } = useFilteredUsers(filter);

  const config = {
    JOINED: [
      {
        key: 'joined_at',
        placeholder: 'Onboarding Date',
        type: 'date',
      },
    ],
    ROLE: [
      {
        key: 'role',
        placeholder: 'Select a user role',
        type: 'select',
        items: [
          {
            name: 'foo',
          },
          {
            name: 'bar',
          },
          {
            name: 'baz',
          },
        ],
      },
    ],
  };

  function onSubmit(builtQuery: FilterGroup) {
    setFilter(builtQuery);
    refetch();
  }
  return (
    <div className="flex flex-col gap-5 p-2">
      <SearchQueryBuilder mainConfig={config} onSubmit={onSubmit} />
      {data && <Table users={data} />}
    </div>
  );
};

export default App;
