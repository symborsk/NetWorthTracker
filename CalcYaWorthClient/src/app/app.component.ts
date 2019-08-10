import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { NetWorthInfo, Asset, Liability } from './classes/CostingInfo';
import { CurrencyFetcherService } from './Services/currency-fetcher.service';
import { CurrencyRate } from './classes/currencyRate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  IsAsset = false;
  frm: FormGroup;

  editField: string;

    private liabilitiesList: Array<NetWorthInfo> = [];

    private assetList: Array<NetWorthInfo> = [];

    private currentRateSelected: CurrencyRate;

    private allCurrencies: Array<CurrencyRate> = [];

    private currentTotal: number;

    constructor(private fb: FormBuilder, private currrencyService: CurrencyFetcherService) {
      // Ensure no errors thrown on initializing of child componented by setting this empty exachange rate
      this.currentRateSelected = new CurrencyRate();
      this.grabAllCurrencyRatesFromService();
    }

    ngOnInit(): void {
      this.frm = this.fb.group({
        Description: new FormControl(null, [Validators.required]),
        Amount: new FormControl(null, [Validators.required])
      });
    }

    updateAmountListLiability(identifier: Guid, property: string, event: any) {
      const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

      this.liabilitiesList[index][property] = this.convertToBase(event.target.textContent);
      this.liabilitiesList[index].dateModifiedTimestamp = new Date().getTime();
      this.calculateTotal();
    }

    updateListLiability(identifier: Guid, property: string, event: any) {
      const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

      this.liabilitiesList[index][property] = event.target.textContent;
      this.liabilitiesList[index].dateModifiedTimestamp = new Date().getTime();
    }

    removeLiability(identifier: Guid) {
      const index = this.liabilitiesList.findIndex(x => x.identifier === identifier);

      this.liabilitiesList.splice(index, 1);
      this.calculateTotal();
    }

    addAssetOrLiability() {
      const descEntered = this.frm.get('Description').value;
      const amountEntered = this.frm.get('Amount').value;

      if (this.IsAsset) {
        const newAsset = new Asset();

        newAsset.identifier = Guid.create();
        newAsset.description = descEntered;
        newAsset.amountBase = this.convertToBase(amountEntered);
        newAsset.dateCreatedTimestamp =  new Date().getTime();
        newAsset.dateModifiedTimestamp = newAsset.dateCreatedTimestamp;
        this.assetList.push(newAsset);
        } else {
          const newLiability = new Liability();

          newLiability.identifier = Guid.create();
          newLiability.description = descEntered;
          newLiability.amountBase = this.convertToBase(amountEntered);
          newLiability.dateCreatedTimestamp =  new Date().getTime();
          newLiability.dateModifiedTimestamp = newLiability.dateCreatedTimestamp;
          this.liabilitiesList.push(newLiability);
      }

      // Believe it is best if this value resets after adding
      this.frm.get('Description').setValue(null);
      this.frm.get('Amount').setValue(null);

      this.calculateTotal();
    }

    updateAmountListAsset(identifier: Guid, property: string, event: any) {
      const index = this.assetList.findIndex(x => x.identifier === identifier);

      this.assetList[index][property] = this.convertToBase(event.target.textContent);
      this.assetList[index].dateModifiedTimestamp = new Date().getTime();
      this.calculateTotal();
    }

    updateListAsset(identifier: Guid, property: string, event: any) {
      const index = this.assetList.findIndex(x => x.identifier === identifier);

      this.assetList[index][property] = event.target.textContent;
      this.assetList[index].dateModifiedTimestamp = new Date().getTime();
    }

    removeAsset(identifier: Guid) {
      const index = this.assetList.findIndex(x => x.identifier === identifier);

      this.assetList.splice(index, 1);
      this.calculateTotal();
    }

    changeValue(event: any) {
      this.editField = event.target.textContent;
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
}
