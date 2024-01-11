import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../shared/share.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    ShareModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
