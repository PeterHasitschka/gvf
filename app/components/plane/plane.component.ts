import { Component, Input } from '@angular/core';
import {Plane} from './plane';



@Component({
    selector: 'graph-plane',
    templateUrl: 'app/components/plane/plane.component.html',
    styleUrls: ['app/components/plane/plane.css']
})
export class PlaneComponent {

    private static counter: number = 0;

    @Input() plane: Plane;

    private id;
    
    ngAfterViewInit(){
        this.plane.initScene("graphvisplanecontainer_" + this.id);
    }
    
    constructor() {
        this.id = PlaneComponent.counter;
        PlaneComponent.counter++;
    }
    
    
    getId(){
        return this.id;
    }

} 