import { Component, OnInit } from '@angular/core';

import {InputText} from 'primeng/primeng';
import {MultiSelect} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import {Button} from 'primeng/primeng';

import {CookieService} from 'angular2-cookie/core';
import { RepositoryService } from '../repository/repository.service'

const COOKIE_KEY = "demo";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers:  [
    CookieService,
    RepositoryService
  ],
  directives: [InputText, MultiSelect, Button]
})
export class HomeComponent implements OnInit {

  title = 'HOME works!';

  cookieValue: string;

  cities: SelectItem[];

  selectedCity: string[];

  atualizarValorCookie(){
    this._cookieService.put(COOKIE_KEY, this.cookieValue);
  }

  constructor(private _cookieService:CookieService, private _repositoryService: RepositoryService) {
  }

  ngOnInit() {
    this.cities = [];
    this.cities.push({label:'New York', value:'New York'});
    this.cities.push({label:'Rome', value:'Rome'});
    this.cities.push({label:'London', value:'London'});
    this.cities.push({label:'Istanbul', value:'Istanbul'});
    this.cities.push({label:'Paris', value:'Paris'});

    this.cookieValue = this._cookieService.get(COOKIE_KEY);

    this._repositoryService.pouchdb.get("1").then((filme:any) => {
      console.log("BD brought: ", filme);
    }).catch((err:any) => {
      console.error("Error while .get(): ", err);
      throw err;
    });
  }


}