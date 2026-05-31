import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to Our Workshop App",
      verificationEmailBody: (createCode) => 
        `Thanks for signing up! Use this code to verify your account: ${createCode()}`,
    },
  },
  multifactor: {
    mode: 'REQUIRED',
    totp: true,
  },
});