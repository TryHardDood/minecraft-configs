import {Component} from "@angular/core";
import {MenuItem} from "./_models/MenuItem";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public toolsMenu: Array<MenuItem> = [
    new MenuItem("Essentials Kit Generator", "essentials_kit", "")
    //new MenuItem("GroupManager Group Generator", "groupmanager", "")
    //new MenuItem("PermissionsEx Group Generator", "permissionsex", "")
  ];

  public itemsMenu: Array<MenuItem> = [
    new MenuItem("Home", "index", "home")
  ];
}
