import {Injectable} from '@angular/core';

@Injectable()
export class WebUrlService{
    public url:string
    constructor(
        // private url:string
    ){
        this.url='http://www.ggeverything.com/public'; 
        console.log('Test');
    }
    
    getUrl(){
        return this.url;
    }
}