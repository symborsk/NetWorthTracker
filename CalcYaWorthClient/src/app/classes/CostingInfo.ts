import { Guid } from 'guid-typescript';

export interface NetWorthInfo {
  identifier: Guid;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}

export class Asset implements NetWorthInfo {
  identifier: Guid;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}

export class Liability implements NetWorthInfo {
  identifier: Guid;
  description: string;
  amountBase: number;
  dateCreatedTimestamp: number;
  dateModifiedTimestamp: number;
}
