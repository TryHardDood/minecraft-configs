import {MinecraftEnchantment} from "./MinecraftEnchantment";

export class MinecraftItem {
  constructor(private type: number, private meta: number, private name: string, private text_type: string, private amount: number, private custom_name: string, private enchantments: MinecraftEnchantment[], private lores: string[]) {
  }

  getType(): number {
    return this.type;
  }

  getMeta(): number {
    return this.meta;
  }

  getName(): string {
    return this.name;
  }

  getTextType(): string {
    return this.text_type;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }

  getCustomName(): string {
    return this.custom_name;
  }

  setCustomName(name: string): void {
    this.custom_name = name;
  }

  getEnchantments(): MinecraftEnchantment[] {
    return this.enchantments;
  }

  addEnchantment(enchantment: MinecraftEnchantment): void {
    this.enchantments.push(enchantment);
  }

  getLores(): string[] {
    return this.lores;
  }

  addLore(lore: string): void {
    this.lores.push(lore);
  }
}
