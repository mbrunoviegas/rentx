interface IResponseAuth {
  user: {
    name: string;
    username: string;
  }
  access_token: string;
  refresh_token: string;
}

export { IResponseAuth };
