import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListRoutingModule } from './shoppingList-routing.module';
import { ShareModule } from '../shared/share.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ShoppingListRoutingModule,
    ShareModule,
  ],
})
export class ShoppingListModule {}