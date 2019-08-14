import { CurrencyRate } from './currencyRate';

export interface AllNetWorthInfo {
  liabilitiesList: Liability[];
  assetList: Asset[];
}

export interface NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;

  UpdateAmount(amountRaw: string, currentCurrencyRate: CurrencyRate): boolean;
  UpdateDescription(description: string): void;
}

export class Asset implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;

  constructor(desc: string,
              amount: number,
              userId: number,
              currentCurrencyRate?: CurrencyRate,
              timeCreated?: number,
              timeModified?: number,
              identifier?: number) {
    this.userId = userId;
    this.description = desc;

    if (currentCurrencyRate) {
      this.amountBase = amount / currentCurrencyRate.RateVersusBase;
    } else {
      this.amountBase = amount;
    }

    if (timeCreated) {
      this.timeCreated = timeCreated;
      this.timeModified = timeModified;
    } else {
      this.timeCreated =  new Date().getTime();
      this.timeModified = this.timeCreated;
    }

    this.identifier = identifier ? identifier : 0;
  }

  UpdateAmount(amountRaw: string, currentCurrencyRate: CurrencyRate): boolean {
    const rawNumber = amountRaw.replace(/[^0-9.]/g, '');

    if (rawNumber) {
      this.amountBase = parseFloat(rawNumber) / currentCurrencyRate.RateVersusBase;
      this.timeModified =  new Date().getTime();
      return true;
    } else {
      return false;
    }
  }

  UpdateDescription(description: string): void {
    this.description = description;
    this.timeModified = new Date().getTime();
  }
}

export class Liability implements NetWorthInfo {
  userId: number;
  identifier: number;
  description: string;
  amountBase: number;
  timeCreated: number;
  timeModified: number;

  constructor(desc: string,
              amount: number,
              userId: number,
              currentCurrencyRate?: CurrencyRate,
              timeCreated?: number,
              timeModified?: number,
              identifier?: number) {

    this.userId = userId;
    this.description = desc;

    if (currentCurrencyRate) {
      this.amountBase = amount / currentCurrencyRate.RateVersusBase;
    } else {
      this.amountBase = amount;
    }

    if (timeCreated) {
      this.timeCreated = timeCreated;
      this.timeModified = timeModified;
    } else {
      this.timeCreated =  new Date().getTime();
      this.timeModified = this.timeCreated;
    }

    this.identifier = identifier ? identifier : 0;
  }


  UpdateAmount(amountRaw: string, currentCurrencyRate: CurrencyRate): boolean {
    const rawNumber = amountRaw.replace(/[^0-9.]/g, '');

    if (rawNumber) {
      this.amountBase = parseFloat(rawNumber) / currentCurrencyRate.RateVersusBase;
      this.timeModified =  new Date().getTime();
      return true;
    } else {
      return false;
    }
  }

  UpdateDescription(description: string): void {
    this.description = description;
    this.timeModified = new Date().getTime();
  }
}
