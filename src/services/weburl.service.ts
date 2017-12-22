import {Injectable} from '@angular/core';

@Injectable()
export class WebUrlService{
    public url:string
    constructor(
        // private url:string
    ){
        // this.url='http://www.ggeverything.com/public'; 
        // this.url='http://www.ggeverything.com';
        // this.url='http://192.168.43.241/stseafood/public';
        this.url='http://192.168.43.241/test/public';

    }
    
    getUrl(){
        return this.url;
    }
}