import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NetWorthInfo, Asset, Liability } from './classes/NetWorthInfo';
import { CurrencyFetcherService } from './Services/currency-fetcher.service';
import { CurrencyRate } from './classes/currencyRate';
import { UserService } from './Services/user.service';
import { NetWorthInfoService } from './Services/net-worth-info.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private frmAssetLiabilityEntre: FormGroup;

  private editField: string;

  private liabilitiesList: Array<NetWorthInfo> = [];

  private assetList: Array<NetWorthInfo> = [];

  private currentRateSelected: CurrencyRate;

  private allCurrencies: Array<CurrencyRate> = [];

  private netWorthTotal: number;
  private assetsTotal: number;
  private liabilitiesTotal: number;

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

  onUpdateAssetAmount(identifier: number, event: any) {
    const asset = this.assetList.find(x => x.identifier === identifier);

    if (asset.UpdateAmount(event.target.textContent, this.currentRateSelected)) {
      this.calculateTotal();
      this.updateAsset(asset);
    }
  }

  onUpdateAssetDesc(identifier: number, event: any) {
    const asset = this.assetList.find(x => x.identifier === identifier);

    asset.UpdateDescription(event.target.textContent);
    this.updateAsset(asset);
  }

  onRemoveAsset(identifier: number) {
    const index = this.assetList.findIndex(x => x.identifier === identifier);

    this.assetList.splice(index, 1);
    this.removeAsset(identifier);
    this.calculateTotal();
  }

  onUpdateLiabilityAmount(identifier: number, event: any) {
    const liability = this.liabilitiesList.find(x => x.identifier === identifier);

    if (liability.UpdateAmount(event.target.textContent, this.currentRateSelected)) {
      this.calculateTotal();
      this.updateLiability(liability);
    }
  }

  onUpdateLiabilityDesc(identifier: number, event: any) {
    const liability = this.liabilitiesList.find(x => x.identifier === identifier);

    liability.UpdateDescription(event.target.textContent);
    this.updateLiability(liability);
  }

  onRemoveLiability(identifier: number) {
    const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

    this.liabilitiesList.splice(index, 1);
    this.removeLiability(identifier);
    this.calculateTotal();
  }

  addAssetOrLiability() {
    const descEntered = this.frmAssetLiabilityEntre.get('Description').value;
    const amountEntered = this.frmAssetLiabilityEntre.get('Amount').value;
    const isAsset = (this.frmAssetLiabilityEntre.get('NetWorthType').value === 'Asset');

    if (isAsset) {
      const newAsset = new Asset(descEntered, amountEntered, this.userId, this.currentRateSelected);
      this.postNewAsset(newAsset);

      } else {
        const newLiability = new Liability(descEntered, amountEntered, this.userId, this.currentRateSelected);
        this.postNewLiability(newLiability);
    }

    // Reset values after adding
    this.frmAssetLiabilityEntre.get('Description').setValue(null);
    this.frmAssetLiabilityEntre.get('Amount').setValue(null);
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
    this.assetsTotal = this.assetList.reduce((sum, current) => sum + current.amountBase, 0);
    this.liabilitiesTotal = this.liabilitiesList.reduce((sum, current) => sum + current.amountBase, 0);

    this.netWorthTotal = this.assetsTotal - this.liabilitiesTotal;
  }

  postNewLiability(newLiability: Liability) {
    this.netWorthInfoService.postLiability(newLiability)
    .subscribe(
      response => {
          newLiability.identifier = response;
          this.liabilitiesList.push(newLiability);
          this.calculateTotal();
    }, error => {
      alert('An unexpected error occured when trying create an liability.');
      console.log(error);
    });
  }

  postNewAsset(newAsset: Asset) {
    this.netWorthInfoService.postAsset(newAsset)
    .subscribe(
      response => {
        newAsset.identifier = response;
        this.assetList.push(newAsset);
        this.calculateTotal();
    }, error => {
      alert('An unexpected error occured when trying create an asset.');
      console.log(error);
    });
  }

  getAllUserNetWorthInfo() {
    this.netWorthInfoService.getNetWorthInfo(this.userId)
    .subscribe(
      response => {
          if (response) {
            // Need to assign these to proper objects so we can handle data manipluation
            response.assets.forEach((a: Asset) => this.assetList.push(new Asset(a.description, a.amountBase,
               a.userId, null, a.timeCreated, a.timeModified, a.identifier)));
            response.liablities.forEach((l: Liability) => this.liabilitiesList.push(new Liability(l.description, l.amountBase,
              l.userId, null, l.timeCreated, l.timeModified, l.identifier)));
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
        alert('An unexpected error occured when trying to fetch current currency rates.');
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
        alert('An unexpected error occured when trying update an asset.');
        console.log(error);
      });
  }

  updateLiability(liability: Liability) {
    this.netWorthInfoService.updateLiability(liability).subscribe(
      () => {},
      error => {
        alert('An unexpected error occured when trying to update a liability.');
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
