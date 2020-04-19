declare module NodeJS {
    interface Global {
      signedIn: boolean,
      accessToken: string
    }
  }