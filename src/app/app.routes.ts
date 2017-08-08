import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./_directives/index/index.component";
import {EssentialsKitComponent} from "./_directives/essentials_kit/essentials_kit.component";
import {GroupManagerComponent} from "./_directives/groupmanager/groupmanager.component";

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  //  {path: 'essentialsx', component: EssentialsXComponent},
  { path: 'essentials_kit', component: EssentialsKitComponent },
  {path: 'groupmanager', component: GroupManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
