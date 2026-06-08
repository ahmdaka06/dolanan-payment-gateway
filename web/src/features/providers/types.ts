export type Provider = {
  id: string;
  name: string;
  code: string;
  isActive?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProviderCreatePayload = {
  code: string;
  name: string;
};

export type ProviderUpdatePayload = {
  name?: string;
  isActive?: boolean;
};
