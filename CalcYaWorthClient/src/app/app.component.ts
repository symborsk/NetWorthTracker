import { Component } from '@angular/core';



export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editField: string;
    liabilitiesList: Array<any> = [
      { Id: 1, Amount: 200000, Description: 'Mortgage', DateCreated: '2019-01-11' , DateModified: '2019-01-11'},
      { Id: 1, Amount: 300000, Description: 'Car Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 1, Amount: 100000, Description: 'RRSP Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 1, Amount: 400000, Description: 'Toaster Loan', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
      { Id: 1, Amount: 500000, Description: 'Bail for Jimmy', DateCreated: '2019-01-11', DateModified: '2019-01-11'},
    ];

    foods: Food[] = [
      {value: '0', viewValue: 'Asset'},
      {value: '1', viewValue: 'Liability'}
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.liabilitiesList[id][property] = editField;
    }

    remove(id: any) {
      this.liabilitiesList.splice(id, 1);
    }

    add() {
        // TODO: Add functionality
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
}
