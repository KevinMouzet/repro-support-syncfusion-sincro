import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		PivotViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
