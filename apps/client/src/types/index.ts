export type FilterRule = {
  type: 'rule';
  properties: {
    type: 'JOINED' | 'ROLE';
    joined_at?: string;
    role?: string;
  };
};

export type FilterGroup = {
  type: 'group';
  condition: 'AND' | 'OR';
  childrens: {
    [key: string]: FilterRule | FilterGroup;
  };
  id: string;
};

export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  joined_at: string;
  created_at: string;
  updated_at: string;
};
