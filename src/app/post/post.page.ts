import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../shared/data.service';
import {environment} from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { HtmlheadService } from '../../providers/seo/seo';
const ENDPOINT_URL = environment.endpointURL;
	
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

    item: any;   
    video: any;   
	items: any[];
	dateFormat = environment.dateFormat;
	skeletion=true;
	section_web=false;
	
    constructor(private route: ActivatedRoute, public dataService: DataService,private http: Http,private sanitizer: DomSanitizer, public htmlheadService:HtmlheadService) { }

    ngOnInit() {
		const itemSlug = this.route.snapshot.paramMap.get('slug');
		const slug = itemSlug;	
		this.http.get(ENDPOINT_URL + 'wp/v2/posts?slug='+slug)
            .map((response: Response) => response.json())
            .subscribe(data => {
					this.skeletion=false;
					this.section_web=true;
					this.item = data[0];
				
		/*************sco service**************/
		console.log(data[0]);
					var title=this.item.title.rendered;
					var description=this.strip_html_tags(this.item.content.rendered);
					var keywords=this.strip_html_tags(this.item.content.rendered);					
					var img=this.item.fimg_url;
					
					this.htmlheadService.addMeta(title,description,keywords,img);
					this.htmlheadService.addMetaOg(title,description,keywords,img);
					this.htmlheadService.addMetaTwitter(title,description,keywords,img);
					
            });
			
			
    }
	strip_html_tags(str)
		{
		   if ((str===null) || (str===''))
			   return false;
		  else
		   str = str.toString();
		  return str.replace(/<[^>]*>/g, '').substring(0, 100);
		}


	

}