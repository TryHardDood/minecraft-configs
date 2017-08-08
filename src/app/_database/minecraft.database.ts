import {MinecraftItem} from "../_models/essentials_kit/MinecraftItem";
import {MinecraftEnchantment} from "../_models/essentials_kit/MinecraftEnchantment";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class MinecraftDatabase {

  private itemsApiURL: string = "/api/items.json";
  private itemsImageApiURL: string = "/api/items/";
  private enchantmentsApiURL: string = "/api/enchantments.json";

  public minecraftItems: MinecraftItem[];
  public minecraftEnchantments: MinecraftEnchantment[];

  constructor(private _http: Http) {

  }

  public initDatabase(): void {
    this.minecraftItems = null;
    this.minecraftEnchantments = null;

    this.initItemsApi();
    this.initEnchantmentsApi();
  }

  public initItemsApi(): void {
    this._http.get(this.itemsApiURL).toPromise().then((response) => {
      let data = response.json();
      return this.minecraftItems = data.map(d => {
        return new MinecraftItem(d.type, d.meta, d.name, d.text_type, 1, "", [], []);
      });
    }).catch(this.handleError);
  }

  public initEnchantmentsApi(): void {
    this._http.get(this.enchantmentsApiURL).toPromise().then((response) => {
      let data = response.json();
      return this.minecraftEnchantments = data.map(d => {
        return new MinecraftEnchantment(d.type, d.level, d.name, d.text_type);
      });
    }).catch(this.handleError);
  }

  public getItemImage(item: string): string {
    return this.itemsImageApiURL + item + ".png";
  }

  public getEnchantmentByTextType(textType: string): MinecraftEnchantment {
    for (let enchantment of this.minecraftEnchantments) {
      if (enchantment.getTextType() === textType) return enchantment;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getMinecraftItems(): MinecraftItem[] {
    return this.minecraftItems
  }

  public getMinecraftEnchantments(): MinecraftEnchantment[] {
    return this.minecraftEnchantments
  }
}
