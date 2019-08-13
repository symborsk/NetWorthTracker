import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { NetWorthInfo, Asset, Liability } from './classes/NetWorthInfo';
import { CurrencyFetcherService } from './Services/currency-fetcher.service';
import { CurrencyRate } from './classes/currencyRate';
import { UserService } from './Services/user.service';
import { NetWorthInfoService } from './Services/net-worth-info.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private frmAssetLiabilityEntre: FormGroup;

  private editField: string;

  private liabilitiesList: Array<NetWorthInfo> = [];

  private assetList: Array<NetWorthInfo> = [];

  private currentRateSelected: CurrencyRate;

  private allCurrencies: Array<CurrencyRate> = [];

  private currentTotal: number;

  private userId = 1; // Hardcoded for now, seperate user interaction implmented next version

  constructor(private fb: FormBuilder,
              private currrencyService: CurrencyFetcherService,
              private userService: UserService,
              private netWorthInfoService: NetWorthInfoService) {}

  ngOnInit(): void {

    this.frmAssetLiabilityEntre = this.fb.group({
      Description: new FormControl(null, [Validators.required]),
      Amount: new FormControl(null, [Validators.required]),
      NetWorthType: 'Asset'
    });

    this.getAllCurrencyRatesFromService();
    this.getAllUserNetWorthInfo();
  }

  onUpdateAmountAsset(identifier: number, property: string, event: any) {
    // strip out any string, we want raw number
    const rawNumber = event.target.textContent.replace(/[^0-9.]/g, '', '');
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    if (rawNumber) {
      this.assetList[index][property] = this.convertToBase(rawNumber);
      this.assetList[index].timeModified = new Date().getTime();
      this.updateAsset(this.assetList[index]);
      this.calculateTotal();
    }
  }

  onUpdateAsset(identifier: number, property: string, event: any) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList[index][property] = event.target.textContent;
    this.assetList[index].timeModified = new Date().getTime();
    this.updateAsset(this.assetList[index]);
  }

  onRemoveAsset(identifier: number) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList.splice(index, 1);
    this.removeAsset(identifier);
    this.calculateTotal();
  }

  onUpdateAmountLiability(identifier: number, property: string, event: any) {
    // strip out any string, we want raw number
    const rawNumber = event.target.textContent.replace(/[^0-9.]/g, '');
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    if (rawNumber) {
      this.liabilitiesList[index][property] = this.convertToBase(rawNumber);
      this.liabilitiesList[index].timeModified = new Date().getTime();
      this.updateLiability(this.liabilitiesList[index]);
      this.calculateTotal();
    }
  }

  onUpdateLiability(identifier: number, property: string, event: any) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.liabilitiesList[index][property] = event.target.textContent;
    this.liabilitiesList[index].timeModified = new Date().getTime();
    this.updateLiability(this.liabilitiesList[index]);
  }

  onRemoveLiability(identifier: number) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.netWorthInfoService.deleteLiability(identifier).subscribe();
    this.liabilitiesList.splice(index, 1);
    this.removeLiability(identifier);
    this.calculateTotal();
  }

  addAssetOrLiability() {
    const descEntered = this.frmAssetLiabilityEntre.get('Description').value;
    const amountEntered = this.frmAssetLiabilityEntre.get('Amount').value;
    const isAsset = (this.frmAssetLiabilityEntre.get('NetWorthType').value === 'Asset');

    if (isAsset) {
      const newAsset = new Asset();

      newAsset.userId = this.userId;
      newAsset.description = descEntered;
      newAsset.amountBase = this.convertToBase(amountEntered);
      newAsset.timeCreated =  new Date().getTime();
      newAsset.timeModified = newAsset.timeCreated;

      this.postNewAsset(newAsset);

      } else {
        const newLiability = new Liability();

        newLiability.userId = this.userId;
        newLiability.description = descEntered;
        newLiability.amountBase = this.convertToBase(amountEntered);
        newLiability.timeCreated =  new Date().getTime();
        newLiability.timeModified = newLiability.timeCreated;

        this.postNewLiability(newLiability);
    }

    // Believe it is best if this value resets after adding
    this.frmAssetLiabilityEntre.get('Description').setValue(null);
    this.frmAssetLiabilityEntre.get('Amount').setValue(null);

    this.calculateTotal();
  }

  // Needed for material inline edit table
  changeValue(event: any) {
    this.editField = event.target.textContent;
  }

  rate_onChange(rate: CurrencyRate) {
    this.currentRateSelected = rate;
    this.updateUsersDefaultCurrency(rate.CurrencyISO4217Code);
  }

  calculateTotal() {
    const sumAssets = this.assetList.reduce((sum, current) => sum + current.amountBase, 0);
    const sumLiabilities = this.liabilitiesList.reduce((sum, current) => sum + current.amountBase, 0);

    this.currentTotal = sumAssets - sumLiabilities;
  }

  convertToBase(value: number): number {
    return value / this.currentRateSelected.RateVersusBase;
  }

  postNewLiability(newLiability: Liability) {
    this.netWorthInfoService.postLiability(newLiability)
    .subscribe(
      response => {
          newLiability.identifier = response;
          this.liabilitiesList.push(newLiability);
    }, error => console.log(error)
    );
  }

  postNewAsset(newAsset: Asset) {
    this.netWorthInfoService.postAsset(newAsset)
    .subscribe(
      response => {
        newAsset.identifier = response;
        this.assetList.push(newAsset);
    }, error => console.log(error)
    );
  }

  getAllUserNetWorthInfo() {
    this.netWorthInfoService.getNetWorthInfo(this.userId)
    .subscribe(
      response => {
          if (response) {
            this.assetList = response.assets;
            this.liabilitiesList = response.liablities;
          }
          this.calculateTotal();
    }, error => console.log(error)
    );
  }

  getAllCurrencyRatesFromService() {

    this.currrencyService.fetchAllCurrencies('EUR')
    .subscribe(
      response => {
        for (const key of Object.keys(response.rates)) {
          const newRate = new CurrencyRate();

          newRate.CurrencyISO4217Code = key;
          newRate.RateVersusBase = response.rates[key];
          this.allCurrencies.push(newRate);
        }

        // once all the currency rates are brought in find the defaul
        this.getUsersDefaultCurrency();
      },
      error => {
        alert('An Unexpected Error Occured when trying to fetch current currency rates.');
        console.log(error);
      });
  }

  getUsersDefaultCurrency() {
    this.userService.getUserInfo(this.userId)
    .subscribe(
      response => {
        if (response.currencyIsoCode) {
          this.currentRateSelected = this.allCurrencies.find( x =>  x.CurrencyISO4217Code === response.currencyIsoCode);
        } else {
          this.currentRateSelected = this.allCurrencies.find(x => x.CurrencyISO4217Code === 'EUR'); // our default to stay in free pricing
        }
    }, error => console.log(error)
    );
  }

  updateAsset(asset: Asset) {
    this.netWorthInfoService.updateAsset(asset).subscribe(
      () => {},
      error => {
        alert('An Unexpected Error Occured when trying to fetch current currency rates.');
        console.log(error);
      });
  }

  updateLiability(liability: Liability) {
    this.netWorthInfoService.updateLiability(liability).subscribe(
      () => {},
      error => {
        alert('An Unexpected Error Occured when trying to fetch current currency rates.');
        console.log(error);
      });
  }

  removeAsset(identifier: number) {
    this.netWorthInfoService.deleteAsset(identifier).subscribe();
  }

  removeLiability(identifier: number) {
    this.netWorthInfoService.deleteLiability(identifier).subscribe();
  }

  updateUsersDefaultCurrency(currencyIso: string) {
    this.userService.updateUserCurrency(this.userId, currencyIso).subscribe();
  }
}
