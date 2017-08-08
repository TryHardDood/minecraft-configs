import {Component, OnInit, ViewChild} from "@angular/core";

import "rxjs/add/operator/toPromise";
import {Kit} from "../../_models/essentials_kit/Kit";
import {FormControl, NgForm, Validators} from "@angular/forms";
import {EssentialsKitItemDialog} from "./essentials_kit_items_dialog.component";
import {MinecraftItem} from "../../_models/essentials_kit/MinecraftItem";
import {MinecraftEnchantment} from "../../_models/essentials_kit/MinecraftEnchantment";
import {ClipboardService} from "ng2-clipboard";
import {MzModalService, MzToastService} from "ng2-materialize";
import {EssentialsKitEditDialog} from "./essentials_kit_edit_dialog.component";

declare var YAML: any;

@Component({
  selector: 'essentials_kit-component',
  templateUrl: './essentials_kit.component.html',
  styleUrls: ['./essentials_kit.component.css']
})

export class EssentialsKitComponent implements OnInit {

  @ViewChild('kitForm')
  public kitForm: NgForm;

  public kitNameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/i)]);
  public kitDelayFormControl = new FormControl('', [Validators.required, Validators.min(-1)]);

  public generatedKits: Kit[];
  public generatedConfig: string = "Click the generate icon on the top right of this card to generate the config.";

  constructor(private _ng2clipboard: ClipboardService, private _toastService: MzToastService, private _modalService: MzModalService) {
  }

  public ngOnInit(): void {
    this.generatedKits = [];
  }

  public sendMessage(message: string) {
    this._toastService.show(message, 4000);
  }

  public onSubmit() {
    if (!this.kitNameFormControl.hasError('required') && !this.kitNameFormControl.hasError('pattern')
      && !this.kitDelayFormControl.hasError('required') && !this.kitDelayFormControl.hasError('min')) {
      this.addKit();
    }
    else {
      if (this.kitNameFormControl.hasError('required')) {
        this.sendMessage('Invalid kit name.');
      }
      else if (this.kitNameFormControl.hasError('pattern')) {
        this.sendMessage('Invalid kit name. Available characters: "A-Za-z0-9_".');
      }

      if (this.kitDelayFormControl.hasError('required')) {
        this.sendMessage('Invalid delay.');
      }
      else if (this.kitDelayFormControl.hasError('min')) {
        this.sendMessage('The minimum value is -1.');
      }
    }
  }

  public openItemDialog(kit: Kit) {
    this._modalService.open(EssentialsKitItemDialog, {kit: kit});
  }

  private addKit() {
    this.generatedKits.push(new Kit(this.kitNameFormControl.value, this.kitDelayFormControl.value, []));

    this.kitNameFormControl.reset();
    this.kitDelayFormControl.reset();

    this.sendMessage("Kit added.");
  }

  copyToClipboard(copy: string): void {
    this._ng2clipboard.copy(copy);
    this.sendMessage("Config copied successfully.");
  }

  public deleteKit(kit: Kit, index: number): void {
    this.generatedKits.splice(index, 1);
    this.sendMessage(kit.getName() + " has been removed.");
  }

  public editKit(kit: Kit): void {
    this._modalService.open(EssentialsKitEditDialog, {kit: kit});
  }

  public deleteItemFromKit(kit: Kit, index: number): void {
    kit.getItems().splice(index, 1);
    this.sendMessage("Item has been removed from " + kit.getName());
  }

  public generateKitConfig(): void {
    let jsonString = '{ "kits": {';

    let kit: Kit;
    let item: MinecraftItem;
    let enchantment: MinecraftEnchantment;
    let lore: string;
    let itemString: string = "";

    for (let y = 0; y < this.generatedKits.length; y++) {

      kit = this.generatedKits[y];
      jsonString += '"' + kit.getName() + '"' + ': {' + '"delay":' + kit.getDelay() + ',' +
        '"items": [';

      for (let i = 0; i < kit.getItems().length; i++) {
        item = kit.getItems()[i];

        itemString = item.getType() + ":" + item.getMeta() + " " + item.getAmount() + " ";
        for (let j = 0; j < item.getEnchantments().length; j++) {
          enchantment = item.getEnchantments()[j];
          itemString += enchantment.getTextType() + ":" + enchantment.getLevel() + " ";
        }

        if (item.getCustomName().length > 0) {
          itemString += "name:" + item.getCustomName() + " ";
        }

        if (item.getLores().length > 0) {
          itemString += "lore:";
          for (let j = 0; j < item.getLores().length; j++) {
            lore = item.getLores()[j];
            itemString += (lore + ((j !== item.getLores().length - 1) ? "|" : ""));
          }
        }

        if (itemString.endsWith(" ")) {
          itemString = itemString.substring(0, itemString.length - 1);
        }

        jsonString += ('"' + itemString + '"' + ((i !== kit.getItems().length - 1) ? "," : ""));
      }
      jsonString += "] }";
      jsonString += ((y !== this.generatedKits.length - 1) ? "," : "");
    }
    jsonString += '} }';

    let jsonObject = JSON.parse(jsonString);
    this.generatedConfig = YAML.stringify(jsonObject, 4);
  }
}
