import { Component } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
selector: 'toast-component-example',
templateUrl: 'toast.component.html',
})

export class ToastComponent {

  constructor(private toastrService: ToastService) {}

  showSuccess() {
    this.toastrService.success('Info message');
  }

  showError() {
    this.toastrService.error('Warning message');
  }

  showInfo() {
    this.toastrService.info('Success message');
  }

  showWarning() {
    this.toastrService.warning('Error message');
  }
}