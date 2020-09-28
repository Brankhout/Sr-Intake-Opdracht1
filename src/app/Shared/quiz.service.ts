import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Questions } from '../question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private _url: string = "https://aartvanhalteren.github.io/db.json"

  constructor(private http: HttpClient,) { }
  

  getQuestions(): Observable<Questions[]>{
    return this.http.get<Questions[]>(this._url)
    
    
  }

}
