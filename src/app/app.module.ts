import {BrowserModule} from "@angular/platform-browser";
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";

import "hammerjs";

import {AppComponent} from "./app.component";
import {IndexComponent} from "./_directives/index/index.component";
import {AppRoutingModule} from "./app.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MapToIterablePipe} from "./_pipes/mapToIterable/mapToIterable.pipe";
import {MaterializeModule} from 'ng2-materialize';

import {GroupManagerComponent} from "./_directives/groupmanager/groupmanager.component";

import {EssentialsKitComponent} from "./_directives/essentials_kit/essentials_kit.component";
import {EssentialsKitItemDialog} from "./_directives/essentials_kit/essentials_kit_items_dialog.component";
import {EssentialsKitEditDialog} from "./_directives/essentials_kit/essentials_kit_edit_dialog.component";

import {MinecraftDatabase} from "./_database/minecraft.database";
import {ClipboardModule} from "ng2-clipboard";

export function databaseServiceFactory(minecraftDatabase: MinecraftDatabase): Function {
  return () => minecraftDatabase.initDatabase();
}

@NgModule({
  declarations: [
    AppComponent,
    MapToIterablePipe,
    IndexComponent,
    GroupManagerComponent,
    EssentialsKitComponent,
    EssentialsKitItemDialog,
    EssentialsKitEditDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    ClipboardModule
  ],
  entryComponents: [
    EssentialsKitItemDialog,
    EssentialsKitEditDialog
  ],
  providers: [MinecraftDatabase,
    {
      provide: APP_INITIALIZER,
      useFactory: databaseServiceFactory,
      deps: [MinecraftDatabase],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
