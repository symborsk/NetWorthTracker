import { Guid } from 'guid-typescript';

export interface NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;
}

export class Asset implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;
}

export class Liability implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;
}
