import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../shared/data.service';
import {environment} from '../../environments/environment';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import pagination component
import { JwPaginationComponent } from 'jw-angular-pagination';

import { HtmlheadService } from '../../providers/seo/seo';
const ENDPOINT_URL = environment.endpointURL;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 
})
export class HomePage {
	
	items: any[];
	
    pageOfItems: any[];
	
	Base_url = environment.endpointURL;
	dateFormat = environment.dateFormat;
	skeletion=true;
	section_web=false;
	
	
	
    constructor(public dataService: DataService,private http: Http, public htmlheadService:HtmlheadService) {
		
		/*************sco service**************/
			var title='THE CODE PRACTICE';
			var description='THE CODE PRACTICE';
			var keywords='THE CODE PRACTICE';
			
			var img='assets/images/icon.png';
			
			this.htmlheadService.addMeta(title,description,keywords,img);
			this.htmlheadService.addMetaOg(title,description,keywords,img);
			this.htmlheadService.addMetaTwitter(title,description,keywords,img);
    }

	ngOnInit() {
        
        this.http.get(ENDPOINT_URL + 'wp/v2/posts?filter[posts_per_page]=30')
            .map((response: Response) => response.json())
            .subscribe(data => {
				
					this.items = data;
					console.log(this.items);
					
					this.skeletion=false;
					this.section_web=true;
            });
    }

	
	onChangePage(pageOfItems: Array<any>) {
		// update current page of items
		this.pageOfItems = pageOfItems;
	}		
	
	
	strip_html_tags(str)
		{
		   if ((str===null) || (str===''))
			   return false;
		  else
		   str = str.toString();
		  return str.replace(/<[^>]*>/g, '');
		}
}
