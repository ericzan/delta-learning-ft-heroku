import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UiOperGrService {

  constructor(private http: HttpService) { }

  getCategories(){
    return this.http.get<any>('dt/ui_oper_gr/get_/categories')
  }
  getDashboard(){
    return this.http.get<any>('dt/ui_oper_gr/get_/dashboard/')
  }
  getInfoUser(){
    return this.http.get<any>('dt/ui_oper_gr/get_/config_uid/')
  }
  getListPackageOfSubCategory(subCatId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_packagelist/${subCatId}`)
  }
  getSubCategory(subCatId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/cat_subc/${subCatId}`)
  }
  getListPackageOfSubCategoryHistory(subCatId: string, page: number, ishow : number){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_packagehistorylist/?idSCat=${subCatId}&ipage=${page}&ishow=${ishow}`)
  }
  setArchivePackage(packageId: string){
    return this.http.post<any>( `dt/ui_oper_lv/pst_/packagearchive/?package=${packageId}
    `,{})
  }
  setNamePackage(packageId: string, label: string){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/packagename/`,{
      package: packageId,
      label,
    })
  }
  getPackage(pkgnameId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_words/${pkgnameId}`)
  }

  getSinglePackage(pkgnameId: string){
    return this.http.get<any>( `dt/ui_oper_gr/get_/user_package_st/${pkgnameId}`)
  }
  getPackageStep4(body: {
    idScat: number,
    package: string,
    capacity: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words4/`,body)
  }
  getUrlAudio(body: {
    word: string,
    idWord: string
  }){
    return environment.apiUrl + `/dt/ui_oper_gr/get_/user_word_pronunciation/?word=${body.word}&idWord=${body.idWord}`
  }
  getPackageStep5(body: {
    idScat: number,
    package: string,
    capacity: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words5/`,body)
  }
  createPackage(body: {
    idScat: number,
    package: string,
    capacity?: number
  }){
    return this.http.post<any>( `dt/ui_oper_gr/pst_/user_words/`,body)
  }
  saveLevel(body: {
    package: string,
    updtime: string,//"2023-06-08T04:21:39.250047",
    level: 'lvl_10_01' | 'lvl_20_01' | 'lvl_30_01' | 'lvl_40_01' | 'lvl_50_01',
    clicksQty: number,
    cardsQty: number
  }){
    return this.http.post<any>( `dt/ui_oper_lv/level/`,body)
  }
  changePassword(body: {
    oldkeypass: string,
    newkeypass: string
  }){
    return this.http.post<any>( `dt/auth/change_pass/`,body)
  }

  getGamesAA(body: {
    orgId: string,
    limit: number,
    subcat: number,
    adj: boolean,
    verb: boolean,
    pt_verb: boolean,
    noun: boolean,
    adv : boolean,
    prep : boolean
  }){
    return this.http.post<any>( `dt/ui_oper_gr/gamesAA/`,body )
  }

  getGamesAA_Archive(body: {
    orgId: string,

    subcat: number,
    words: string,
    average: string,
    kogame: string,
  }){
    return this.http.post<any>( `dt/ui_oper_gr/gamesAA_archive/`,body )
  }

  getleval(body: {
  orgId: string,
  starton: number,
  limit: number,
  word: string,
  setlevel: boolean,
}){
  return this.http.post<any>( `dt/ui_oper_gr/leval/`,body )
}

getGamesAAPuzzleWords(body: {
  "org": string,
  "ulevel": string,
  "kog": string,
  "hms": number,
  "words":string,
  "avg": number,
  "setlevel":boolean,
}){
  return this.http.post<any>( `dt/ui_oper_gr/gamesAA_puzzlewords/`,body )
}


}