import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector:'[DropDownDirective]',
    exportAs: 'DropDownDirective'
})

export class DropDownDirective{
    constructor(private _elementRef:ElementRef){
    }
    @Output() public dropDown = new EventEmitter<MouseEvent>();
    @HostListener('document:click',['$event','$event.target']) public onClick(event:MouseEvent,targetElement:HTMLElement):void{
        if(!targetElement){
            return;
        }

        const clickedOutside = this._elementRef.nativeElement.contains(targetElement);
        if(!clickedOutside){
            this.dropDown.emit(event);
        }
    }
    @HostBinding('show') isOpen = false;
    @HostListener('click') toggleOpen(){this.isOpen = !this.isOpen}

}