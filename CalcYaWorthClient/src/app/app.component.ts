import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

    constructor(private fb: FormBuilder, private currrencyService: CurrencyFetcherService) {}

    ngOnInit(): void {
      this.frm = this.fb.group({
        Description: null,
        Amount: null
      });

      this.grabAllCurrencyRatesFromService();
    }

    updateListLiability(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.liabilitiesList[id][property] = editField;
    }

    removeLiability(id: any) {
      this.liabilitiesList.splice(id, 1);
    }

    addAssetOrLiability() {
      const descEntered = this.frm.get('Description').value;
      const amountEntered = this.frm.get('Amount').value;

      if (this.IsAsset) {
        const newAsset = new Asset();

        newAsset.identifier = Guid.create();
        newAsset.description = descEntered;
        newAsset.amountBase = amountEntered;
        newAsset.dateCreatedTimestamp =  new Date().getTime();
        newAsset.dateModifiedTimestamp = newAsset.dateCreatedTimestamp;
        this.assetList.push(newAsset);
        } else {
          const newLiability = new Liability();

          newLiability.identifier = Guid.create();
          newLiability.description = descEntered;
          newLiability.amountBase = amountEntered;
          newLiability.dateCreatedTimestamp =  new Date().getTime();
          newLiability.dateModifiedTimestamp = newLiability.dateCreatedTimestamp;
          this.liabilitiesList.push(newLiability);
      }
    }

    updateListAsset(id: number, property: string, event: any) {
      const editField = event.target.textContent;

      this.liabilitiesList[id][property] = editField;
    }

    removeAsset(id: any) {
      this.liabilitiesList.splice(id, 1);
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    grabAllCurrencyRatesFromService() {

      const ratesSupported = this.currrencyService.GetAllRatesSupported();

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

    }
}
