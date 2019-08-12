import { Guid } from 'guid-typescript';

export interface NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}

export class Asset implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}

export class Liability implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}
