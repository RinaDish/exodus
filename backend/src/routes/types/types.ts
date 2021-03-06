export type GetOutput = {
  Item: Users;
};

export type Users = {
  id: string;
  key: string;
  name: string;
  username: string;
  password: string;
  xtoken: string;
  telegramId?: string;
  accounts: string[];
};

export type Statement = {
  accountId: string;
  username: string;
  [k: number]: {
    rawData: MonoStatement[];
    processedData: LimitCategory[];
  };
};

export type UserMeta = {
  username: string;
};

export type StatementRequest = {
  month: 'previous' | 'current';
};

export type Category = {
  mcc: {
    numbers: number[];
    ranges: number[][];
  };
  category: string;
  id: number;
};

export type LimitCategory = {
  category: string;
  id: number;
  limit?: number;
} & {
  moneySpent: number;
};

export type Payment = {
  category: string;
  categoryId: number;
  description: string;
  amount: number;
};

export type MonoClientInfo = {
  clientId: string;
  name: string;
  webHookUrl: string;
  accounts: MonoAccount[];
};

export type MonoAccount = {
  id: string;
  currencyCode: number;
  cashbackType: 'None' | 'UAH' | 'Miles';
  balance: number;
  creditLimit: number;
  maskedPan: string[];
  type: 'black' | 'white' | 'platinum' | 'iron' | 'fop' | 'yellow';
  iban: string;
};

export type ClientInfo = {
  name: string;
  webHookUrl: string;
  accounts: Account[];
};

type Account = {
  id: string;
  currencyCode: number;
  balance: number;
  creditLimit: number;
  type: string;
};

export type MonoStatements = MonoStatement[];

export type MonoStatement = {
  id: string;
  time: number;
  description: string;
  mcc: number;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  hold: boolean;
};

export type AccountInfo = {
  amount: number;
  balance: number;
  cashbackAmount: number;
  commissionRate: number;
  currencyCode: number;
  description: string;
  hold: boolean;
  id: string;
  mcc: number;
  operationAmount: number;
  time: number;
};
