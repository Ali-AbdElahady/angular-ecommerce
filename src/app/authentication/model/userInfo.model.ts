export class UserInfo{
  constructor(
    public name : {
      firstName:string,
      lastName:string
    },
    public id:string,
    public role:string,
    public email:string,
    private _token:string,
    private _tokenExpirationDate : Date
  ){}
  get token(){
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null
    }
    return this._token;
  }
}
