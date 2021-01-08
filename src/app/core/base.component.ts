
import { InjectDecorator, OnDestroy, Type } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { AlertService } from '../services/common/alert.service';

export abstract class BaseComponent implements OnDestroy {

    
    constructor(
        private alertService: AlertService,
        private toastrService: ToastService
    ) {

    }
    
    ngOnDestroy(): void {
       //this.destroy$.next(true);
    }

}