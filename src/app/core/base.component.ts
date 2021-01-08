import { Subject } from "rxjs/Subject";
import { InjectDecorator, OnDestroy, Type } from '@angular/core';
import { AlertService } from "app/services/common/alert.service";
import { ToastService } from 'ng-uikit-pro-standard';

export abstract class BaseComponent implements OnDestroy {
    protected destroy$ = new Subject();

    
    constructor(
        private alertService: AlertService,
        private toastrService: ToastService
    ) {

    }
    
    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}