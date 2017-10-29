import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { shortid } from 'shortid';

import { LetterService } from '../services/letter.service';
import { Letter } from '../models/letter';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    template: `<compose-component
    [buttonSrc]=buttonSrc
    [letter]=letter
    (buttonClick)=buttonClick($event)>
    </compose-component>
    `,
})
export class ViewPageComponent implements OnInit{
    letter: Letter={
        _id: 'new',
        content: 'loading...'
    };

    buttonSrc='/assets/write_clean.png';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private letterService: LetterService 
      ) {}
    
    ngOnInit(){
        console.log('view page component');
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.letter.content=params.get('id');
            this.letterService.getLetter(params.get('id'))
                .then((letter) => {
                    console.log(letter);
                    if(letter){
                        this.letter=letter;
                    }else{
                        this.router.navigate(['/compose/'+require('shortid').generate()]);
                    }
                });
        });

    }

    buttonClick(){
        //redirect to a new compose
        this.router.navigate(['/compose/'+require('shortid').generate()]);
    }
}