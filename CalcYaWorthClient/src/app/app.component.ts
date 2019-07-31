import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImplicitReceiver } from '@angular/compiler';



export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  IsAsset = false;
  frm: FormGroup;
  editField: string;

    liabilitiesList: Array<any> = [
      { Id: 1, Amount: 200000, Description: 'Mortgage', DateCreated: '2019-01-11' , DateModified: '2019-01-11'},
      { Id: 2, Amount: 300000, Description: 'Car Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 3, Amount: 100000, Description: 'RRSP Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 4, Amount: 400000, Description: 'Toaster Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 5, Amount: 500000, Description: 'Bail for Jimmy', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
    ];

    assetList: Array<any> = [
      { Id: 1, Amount: 200000, Description: 'RRSP', DateCreated: '2019-01-11' , DateModified: '2019-01-11'},
      { Id: 2, Amount: 300000, Description: 'TFSA', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 3, Amount: 100000, Description: 'House', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 4, Amount: 400000, Description: 'Boat', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 5, Amount: 500000, Description: 'House Boat', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.frm = this.fb.group({
        Description: null,
        Amount: null
      });
    }

    updateListLiability(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.liabilitiesList[id][property] = editField;
    }

    removeLiability(id: any) {
      this.liabilitiesList.splice(id, 1);
    }

    add() {
      const Desc = this.frm.get('Description').value;
      const amo = this.frm.get('Amount').value;

      if (this.IsAsset) {
          this.assetList.push({ Id: 5, Amount: amo, Description: Desc, DateCreated: '2019-01-11', DateModified: '2019-01-11'});
        } else {
          this.liabilitiesList.push({ Id: 5, Amount: amo, Description: Desc, DateCreated: '2019-01-11', DateModified: '2019-01-11'});
      }
    }

    updateListAsset(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.assetList[id][property] = editField;
    }

    removeAsset(id: any) {
      this.assetList.splice(id, 1);
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
}
