import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadImageService } from '../service/upload-image.service';
import { ImageSetterService } from '../service/image-setter.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  
  constructor(private uploadService:UploadImageService, private imageService:ImageSetterService) {
    this.loadingFlags = new Array(5).fill(true);
  }
  
  
  current = 0;
  
  index = 'First-content';
  uploadContent:boolean = true;
  textEditingContent:boolean = false;
  resultPageContent:boolean = false;

  uploadButtonVisible:boolean = true;
  uploadedImage:NzUploadFile[] = [];
  fileTypeUploadValidation:boolean = false;
  base64ImageFile:string | ArrayBuffer | null = null;
  subject = new Subject<boolean>();
  uploadImageOptions={
    showPreviewIcon:false,
    showRemoveIcon:true,
    showDownloadIcon:true
  }
  spinner:boolean = false;
  editorContentFromGPT:string = '';
  fineTunedArray:string[] = [];

  listOfImages:any[] = [];
  loadingFlags: boolean[] = [];
  projectName:string = '';
  logoPreference:string = '';

  
  
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        this.uploadContent = true;
        this.textEditingContent = false;
        this.resultPageContent = false;
        this.uploadedImage  = [];
        this.uploadButtonVisible = true;
        this.base64ImageFile = null;
        break;
      }
      case 1: {
        this.index = 'Second-content';
        this.uploadContent = false;
        this.textEditingContent = true;
        this.resultPageContent = false;
        this.spinner = true;
        this.uploadService.postImage(this.base64ImageFile).pipe(takeUntil(this.subject)).subscribe((data:any)=>{
          this.spinner = false;
          this.editorContentFromGPT = data.choices[0].message.content;
          // this.uploadService.getFineTunedPrompt(this.editorContentFromGPT,this.projectName,this.logoPreference).pipe(takeUntil(this.subject)).subscribe((data:any)=>{
          //   console.log(data,'<<--------FINE TUNED PROMPT');
          //   this.fineTunedArray = (data.choices[0].message.content).split('|');
          //   this.next();
          // }) 
          console.log(this.editorContentFromGPT.length)      
        });

        break;
      }
      case 2: {
        this.uploadContent = false;
        this.textEditingContent = false;
        this.resultPageContent = true;
        this.spinner = true;

         this.uploadService.getImageFromStablity(this.editorContentFromGPT).pipe(takeUntil(this.subject)).subscribe((data:any)=>{
      this.decodeBase64Image(data.artifacts);  
    })

        // this.fineTunedArray.forEach((item:string)=>{
        //   this.spinner = true;
        //   this.uploadService.getImagesFromDallE(item).pipe(takeUntil(this.subject)).subscribe((data:any)=>{
        //     console.log(data)
        //     this.listOfImages.push(data.data[0].url);
        //     this.spinner = false;
        //   })       
        // })
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  base64Image:any[] =[];

  decodeBase64Image(base64DataArray:any[]): void {
    console.log(base64DataArray);
    this.spinner = false;
    base64DataArray.forEach((dataImage:any)=>{
      const imageString  = 'data:image/jpeg;base64,' + dataImage.base64;
      this.base64Image.push(imageString);
    })
  }

  fileStatus(data:any){
    if(data.type === 'removed'){
      this.uploadedImage  = [];
      this.uploadButtonVisible = true;
      this.base64ImageFile = null;
    }
   
  }

  isFileChanged:boolean = false;
    beforeUpload = (file: any) => {
      this.uploadedImage = [];
      return this.validUploadFile(file);
  };

  validUploadFile(file: any): boolean {
    const validFileTypes = ["jpeg","png","jpg","svg+xml"];
    const fileType = (file.type)?.substring((file.type).lastIndexOf("/")+1);
    if(validFileTypes.includes(fileType)){
      console.log(file,'<<--file')
      this.fileTypeUploadValidation = false;   
      this.uploadButtonVisible = false;
      this.fileToBinary(file);
      return true;
    }else{      
        this.fileTypeUploadValidation = true;    
      return false;     
    }  
  }

  imageLoaded(index: number): void {
    this.loadingFlags[index] = false; // Set loading flag to false for the loaded image
  }




fileToBinary(file:any):any{
  if(file.type === 'image/svg+xml'){    
    const reader = new FileReader();
    let svgStrings:string = '';

    reader.onload = (e: any) => {
      const svgString = e.target.result;
      svgStrings = svgString
    };

    reader.onloadend = ():any =>{
      if(reader.readyState === FileReader.DONE){
        const svgBlob = new Blob([svgStrings], { type: 'image/svg+xml' });
        this.uploadedImage =  this.imageService.setImageInUpload(svgBlob,file.name);
        this.convertToBase64(file);
      }
    }

    reader.readAsText(file); 
  }else{

    const reader = new FileReader();
    let globalBinaryData: ArrayBuffer | null = null;

    let imageBlob: Blob|any = null;
    reader.onload = (e) =>{
      globalBinaryData = reader.result as ArrayBuffer;
      imageBlob = new Blob([globalBinaryData], {type:file.type})
    }

    reader.onloadend = ():any =>{
      if(reader.readyState === FileReader.DONE){
        this.uploadedImage =  this.imageService.setImageInUpload(imageBlob, file.name);   
        this.convertToBase64(file);    
      }
    }
    reader.readAsArrayBuffer(file);

  }  
}




convertToBase64(file: File){
  const reader = new FileReader();

  reader.onload = () => {
    const base64String: string | ArrayBuffer | null = reader.result;
    this.base64ImageFile =  base64String
  };

  reader.readAsDataURL(file);
}



 


}
