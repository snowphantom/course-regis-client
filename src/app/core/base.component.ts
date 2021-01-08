import { InjectDecorator, OnDestroy, Type } from '@angular/core';

export abstract class BaseComponent implements OnDestroy {

    
    constructor(
        
    ) {

    }
    
    ngOnDestroy(): void {
       //this.destroy$.next(true);
    }

}