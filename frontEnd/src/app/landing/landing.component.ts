import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../service/upload-image.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  base64Image:any[] = [];
  constructor(private imageService:UploadImageService){}

  ngOnInit(): void {
    // this.imageService.getImageFromStablity().subscribe((data:any)=>{
    //   this.decodeBase64Image(data.artifacts);  
    // })
    }

    decodeBase64Image(base64DataArray:any[]): void {
      console.log(base64DataArray);
      base64DataArray.forEach((dataImage:any)=>{
        const imageString  = 'data:image/jpeg;base64,' + dataImage.base64;
        this.base64Image.push(imageString);
      })

    }

}
