import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService], // declaring using service
})
export class NewAccountComponent {
  // inject service
  constructor(
    // private loggingService: LoggingService,
    private accountService: AccountService,
  ) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    // using service
    // this.loggingService.logStatusChange(accountStatus);

    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
