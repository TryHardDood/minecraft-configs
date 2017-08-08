import {Component, Input, ViewChild} from "@angular/core";
import {Kit} from "../../_models/essentials_kit/Kit";
import {MinecraftItem} from "../../_models/essentials_kit/MinecraftItem";
import {FormControl, NgForm, Validators} from "@angular/forms";
import "rxjs/add/operator/startWith";
import {MinecraftDatabase} from "../../_database/minecraft.database";
import {MinecraftEnchantment} from "../../_models/essentials_kit/MinecraftEnchantment";
import {MzBaseModal, MzModalComponent, MzToastService} from 'ng2-materialize';

@Component({
  selector: 'essentials_kit_dialog',
  templateUrl: './essentials_kit_items_dialog.component.html',
})
export class EssentialsKitItemDialog extends MzBaseModal {
  @Input() public kit: Kit;

  constructor(private _mcDatabase: MinecraftDatabase, private _toastService: MzToastService) {
    super();

    this.minecraftItems = this._mcDatabase.minecraftItems;
    this.minecraftEnchantments = this._mcDatabase.minecraftEnchantments;
  }

  public minecraftItems: MinecraftItem[];
  public minecraftEnchantments: MinecraftEnchantment[];

  @ViewChild('addItemModal')
  public addItemModal: MzModalComponent;

  @ViewChild('itemForm')
  public itemForm: NgForm;

  public itemsFormControl = new FormControl('', [Validators.required]);
  public itemNameFormControl = new FormControl('');
  public itemAmountFormControl = new FormControl('', [Validators.required, Validators.min(1)]);
  public itemLoreFormControl = new FormControl('');

  public onSubmit(form: NgForm) {
    if (!this.itemsFormControl.hasError('required') && !this.itemAmountFormControl.hasError('required') && !this.itemAmountFormControl.hasError('min')) {
      this.addItemToKit(form.value);
    }
    else {
      if (this.itemsFormControl.hasError('required')) {
        this.sendMessage('Invalid item.');
      }

      if (this.itemAmountFormControl.hasError('required')) {
        this.sendMessage('Invalid amount.');
      }
      else if (this.itemAmountFormControl.hasError('min')) {
        this.sendMessage('Invalid amount. Minimum 1.');
      }
    }
  }

  public addItemToKit(enchants: object) {
    let item: MinecraftItem = this.itemsFormControl.value;

    item.setAmount(this.itemAmountFormControl.value);

    if (this.itemNameFormControl.value !== '') {
      let name: string = this.itemNameFormControl.value;
      name = name.replace(/\s/g, "_");
      item.setCustomName(name);
    }

    if (this.itemLoreFormControl.value !== '') {
      let lores: string[] = this.itemLoreFormControl.value.split('\n');
      for (let lore of lores) {
        lore = lore.replace(/\s/g, "_");
        item.addLore(lore);
      }
    }

    let enchantment: MinecraftEnchantment;
    for (let key of Object.keys(enchants)) {
      if (enchants[key] === '' || enchants[key] === null) continue;

      enchantment = Object.create(this._mcDatabase.getEnchantmentByTextType(key));
      enchantment.setLevel(enchants[key]);

      item.addEnchantment(enchantment);
    }

    this.kit.getItems().push(item);

    this.itemsFormControl.reset();
    this.itemNameFormControl.reset();
    this.itemAmountFormControl.reset();
    this.itemLoreFormControl.reset();

    this.addItemModal.close();
  }

  public sendMessage(message: string) {
    this._toastService.show(message, 4000);
  }

  public getImage(item: MinecraftItem): string {
    return this._mcDatabase.getItemImage(item.getType() + "-" + item.getMeta());
  }
}
