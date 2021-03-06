import { Letter } from '../models/letter';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class LetterService {
 
    private headers = new Headers({'Content-Type': 'application/json'});

    private letterUrl = 'http://localhost:3000';  // Url that all info Letter 's will be stored at

    constructor(private http: Http) { }

    getLetter(_id: string): Promise<any> {  //pulls off a Letter class object letter from a storage at a url
        const url = `${this.letterUrl}/retrieve/${_id}`;  //creates the url that will be accessed, based on the id given
        console.log(url);
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Letter)    //makes the server wait until information is returned
               .catch(this.handleError);   //catches an error if no letter class object exists at that url
    }

    update(letter: Letter): Promise<Letter> {   //puts a Letter class object letter at the url letterUrl/letter.id
        const url = `${this.letterUrl}/create`;//${letter._id}`;   //generates the storage url for letter
        return this.http.post(url, JSON.stringify({letter: letter}), {headers: this.headers}) 
          .toPromise()      //makes the server wait until information is returned
          .then(() => letter)   //???
          .catch(this.handleError);     //catches an error if no letter class object exists
    }

    private handleError(error: any): Promise<any> {     //error message if any error occurs
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
}