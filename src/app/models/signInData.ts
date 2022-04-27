export class SignInData {
  private tc: string;
  private password: string;
  
  constructor(tc:string, password:string){
      this.tc = tc;
      this.password = password;
  }

  getTc(): string{
      return this.tc;
  }

  getPassword(): string{
      return this.password;
  }
}
