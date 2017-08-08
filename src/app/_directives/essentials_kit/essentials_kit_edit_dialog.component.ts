import {MzBaseModal, MzModalComponent, MzToastService} from "ng2-materialize";
import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {Kit} from "../../_models/essentials_kit/Kit";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'essentials_kit_edit_dialog',
  templateUrl: './essentials_kit_edit_dialog.component.html',
})
export class EssentialsKitEditDialog extends MzBaseModal implements OnInit{
  ngOnInit(): void {
    console.log(this.kit);

    this.kitNameFormControl.setValue(this.kit.getName());
    this.kitDelayFormControl.setValue(this.kit.getDelay());
  }

  @Input() public kit: Kit;

  constructor(private _toastService: MzToastService) {
    super();
  }

  @ViewChild('editKitModal')
  public editKitModal: MzModalComponent;

  public kitNameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/i)]);
  public kitDelayFormControl = new FormControl('', [Validators.required, Validators.min(-1)]);

  public onSubmit() {
    if (!this.kitNameFormControl.hasError('required') && !this.kitNameFormControl.hasError('pattern')
      && !this.kitDelayFormControl.hasError('required') && !this.kitDelayFormControl.hasError('min')) {

      this.kit.setName(this.kitNameFormControl.value);
      this.kit.setDelay(this.kitDelayFormControl.value);

      this.editKitModal.close();
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

  public sendMessage(message: string) {
    this._toastService.show(message, 4000);
  }
}
