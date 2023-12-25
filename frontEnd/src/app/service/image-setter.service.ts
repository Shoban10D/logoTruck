import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSetterService {

  constructor() { }

  setImageInUpload(imageBlob:Blob,fileName:string):Array<any>{
  
    const dataUrl = URL.createObjectURL(imageBlob);
    let uploadedImage:any[] = [];
      uploadedImage.push({
        uid:'1',
        name:fileName,
        status:'done',
        thumbUrl:dataUrl,
        url:dataUrl
      })

      return uploadedImage
  
}


convertToBase64(file: File): string {
  const reader = new FileReader();
  let base64Data:string | ArrayBuffer | null = '';

  reader.onload = () => {
    const base64String: string | ArrayBuffer | null = reader.result;
    console.log('Base64 encoded:', base64String);
    base64Data =  base64String
  };

  reader.onloadend = () =>{
    return base64Data;
  }
  reader.readAsDataURL(file);
  return '';

}


}
