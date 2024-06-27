
export class MenuUrl {
  private static instance: MenuUrl;

  private constructor() {
  }

  public static REDIRECT_REASON_DUPLICATE_LOGIN = '0';

  public static CONSOLE: string = `/console`;
  public static CONSOLE_DASHBOARD: string = `${this.CONSOLE}/dashboard`;


  public static LOGIN: string = `/login`;
  public static LOGIN_REDIRECT_ELSEWHERE: string = `/login?reason=${this.REDIRECT_REASON_DUPLICATE_LOGIN}`;



  public static SETTINGS = `${this.CONSOLE}/settings`;
  public static SETTINGS_MY_PROFILE = `${this.SETTINGS}/my`;

  public static DEV = `${this.CONSOLE}/dev`;


}