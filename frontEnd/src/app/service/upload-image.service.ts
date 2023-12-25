import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http:HttpClient) { }
  //For chat GPT
   headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      })

  //For stablity
  headers2 = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':`Bearer sk-9WNxt6klKLGo1CrFuoWX75yfE4BPOhm1F2j4ZXLUQgxuKdq0`,
    'Accept': 'application/json'
  })

  postImage(imageUrl:any){

    const payload = {
      "model": "gpt-4-vision-preview",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "Identify the key design attributes from the uploaded image and return the style details, color palette, shapes, and font characteristics."
            },
            {
              "type": "image_url",
              "image_url": {
                  "url": imageUrl
              }
            }
          ]
        }
      ],
      "max_tokens": 300
    }
    return this.http.post('https://api.openai.com/v1/chat/completions',payload,{headers:this.headers});
  }

  getImagesFromDallE(prompt:string){
    const payload = {
      "model": "dall-e-3",
      "prompt": prompt,
      "n": 1,
      "size": "1024x1024"
    }
    return this.http.post('https://api.openai.com/v1/images/generations',payload,{headers:this.headers});
  }

  getFineTunedPrompt(tunePrompt:string,projectName:string,logoPreference:string){

    const requestPrompt = "Create a text-based logo concept based on the following details"+tunePrompt;

    const payload = {
      "model": "gpt-4",
      "messages": [
        {
          "role": "user",
          "content": requestPrompt
        }
      ]
    }
    return this.http.post('https://api.openai.com/v1/chat/completions',payload,{headers:this.headers});
  }

  getImageFromStablity(request:string){
    const payload = {
      "steps": 40,
      "width": 512,
      "height": 512,
      "seed": 0,
      "cfg_scale": 5,
      "samples": 6,
      "text_prompts": [
        {
          "text": 'Generate me a logo from the following observations '+request,
          "weight": 1
        }
      ]
    }
    return this.http.post('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image',payload,{headers:this.headers2})
  }

  // getImagesFromStability(){

  //   const requestPrompt = "Create a text-based logo concept based on the following details"+tunePrompt;



  //   const payload = {
  //     steps: 40,
  //   width: 512,
  //   height: 512,
  //   seed: 0,
  //   cfg_scale: 5,
  //   samples: 1,
  //   text_prompts: [
  //     {
  //       "text": "A shining star made of Gold bars\n\nThe logo represents the financial success that Capitalize brings for its customers through smart solutions",
  //       "weight": 1
  //     },
  //   ],
  //   };
  // }
}
