export interface Icontroller {
  db?: any; // need to rewrite
  userId?: number;
  body: any;
  set: any;
}

export enum sourceEnum {
  ONBOARDING = 'ONBOARDING',
  FORGETPASSWORD = 'FORGETPASSWORD',
}
