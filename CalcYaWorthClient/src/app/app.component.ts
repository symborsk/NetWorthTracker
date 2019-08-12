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

  IsAsset = false;

  frmAssetLiabilityEntre: FormGroup;

  editField: string;

  private liabilitiesList: Array<NetWorthInfo> = [];

  private assetList: Array<NetWorthInfo> = [];

  private currentRateSelected: CurrencyRate;

  private allCurrencies: Array<CurrencyRate> = [];

  private currentTotal: number;

  private userId = 1; // Hardcoded for now, seperate user interaction implmented next version

  constructor(private fb: FormBuilder,
              private currrencyService: CurrencyFetcherService,
              private userService: UserService,
              private netWorthInfoService: NetWorthInfoService) {
    // Ensure no errors thrown on initializing of child componented by setting this empty exachange rate
    this.currentRateSelected = new CurrencyRate();
    this.grabAllCurrencyRatesFromService();
  }

  ngOnInit(): void {
    this.frmAssetLiabilityEntre = this.fb.group({
      Description: new FormControl(null, [Validators.required]),
      Amount: new FormControl(null, [Validators.required])
    });

    this.setUsersDefaultCurrencyRate();
    this.grabAllUserNetWorthInfo();
  }

  updateAmountListAsset(identifier: number, property: string, event: any) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList[index][property] = this.convertToBase(event.target.textContent);
    this.assetList[index].dateModifiedTimestamp = new Date().getTime();
    this.netWorthInfoService.updateAsset(this.assetList[index]);
    this.calculateTotal();
  }

  updateListAsset(identifier: number, property: string, event: any) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList[index][property] = event.target.textContent;
    this.assetList[index].dateModifiedTimestamp = new Date().getTime();
    this.netWorthInfoService.updateAsset(this.assetList[index]);
  }

  removeAsset(identifier: number) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList.splice(index, 1);
    this.removeAsset(identifier);
    this.calculateTotal();
  }

  updateAmountListLiability(identifier: number, property: string, event: any) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.liabilitiesList[index][property] = this.convertToBase(event.target.textContent);
    this.liabilitiesList[index].dateModifiedTimestamp = new Date().getTime();
    this.netWorthInfoService.updateLiability(this.liabilitiesList[index]);
    this.calculateTotal();
  }

  updateListLiability(identifier: number, property: string, event: any) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.liabilitiesList[index][property] = event.target.textContent;
    this.liabilitiesList[index].dateModifiedTimestamp = new Date().getTime();
    this.netWorthInfoService.updateLiability(this.liabilitiesList[index]);
  }

  removeLiability(identifier: number) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.netWorthInfoService.deleteLiability(identifier).subscribe();
    this.liabilitiesList.splice(index, 1);
    this.removeLiability(identifier);
    this.calculateTotal();
  }

  addAssetOrLiability() {
    const descEntered = this.frmAssetLiabilityEntre.get('Description').value;
    const amountEntered = this.frmAssetLiabilityEntre.get('Amount').value;

    if (this.IsAsset) {
      const newAsset = new Asset();

      newAsset.userId = this.userId;
      newAsset.description = descEntered;
      newAsset.amountBase = this.convertToBase(amountEntered);
      newAsset.dateCreatedTimestamp =  new Date().getTime();
      newAsset.dateModifiedTimestamp = newAsset.dateCreatedTimestamp;

      this.PostNewAsset(newAsset);
      this.assetList.push(newAsset);

      } else {
        const newLiability = new Liability();

        newLiability.userId = this.userId;
        newLiability.description = descEntered;
        newLiability.amountBase = this.convertToBase(amountEntered);
        newLiability.dateCreatedTimestamp =  new Date().getTime();
        newLiability.dateModifiedTimestamp = newLiability.dateCreatedTimestamp;

        this.PostNewLiability(newLiability);

        this.liabilitiesList.push(newLiability);
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
  }

  calculateTotal() {
    const sumAssets = this.assetList.reduce((sum, current) => sum + current.amountBase, 0);
    const sumLiabilities = this.liabilitiesList.reduce((sum, current) => sum + current.amountBase, 0);

    this.currentTotal = sumAssets - sumLiabilities;
  }

  convertToBase(value: number): number {
    return value / this.currentRateSelected.RateVersusBase;
  }

  PostNewLiability(newLiability: Liability) {
    this.netWorthInfoService.postLiability(newLiability)
    .subscribe(
      response => {
          newLiability.identifier = response;
          this.liabilitiesList.push(newLiability);
    }, error => console.log(error)
    );
  }

  PostNewAsset(newAsset: Asset) {
    this.netWorthInfoService.postAsset(newAsset)
    .subscribe(
      response => {
        newAsset.identifier = response;
        this.assetList.push(newAsset);
    }, error => console.log(error)
    );
  }

  grabAllUserNetWorthInfo() {
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

  grabAllCurrencyRatesFromService() {

    this.currrencyService.fetchAllCurrencies('EUR')
    .subscribe(
      response => {

        for (const key of Object.keys(response.rates)) {

          const newRate = new CurrencyRate();
          newRate.CurrencyISO4217Code = key;
          newRate.RateVersusBase = response.rates[key];
          this.allCurrencies.push(newRate);
        }

        this.currentRateSelected = this.allCurrencies.find(x => x.CurrencyISO4217Code === 'EUR');
      },
      (error: Response) => {
        if (error.status === 104)  {
          alert('The API has run out of requests for this month, someone should have payed the bill. ¯\_(ツ)_/¯');
        } else {
          alert('An Unexpected Error Occured when trying to fetch current currency rates.');
          console.log(error);
        }
      });
  }

  setUsersDefaultCurrencyRate() {
    this.userService.getUserCurrency(this.userId)
    .subscribe(
      response => {
        if (!response) {
          this.currentRateSelected = this.allCurrencies.find( x =>  x.CurrencyISO4217Code === response);
        }
    }, error => console.log(error)
    );
  }
}
