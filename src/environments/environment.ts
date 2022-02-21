// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  //'http://dtapi.if.ua:8081/api/auth/'
  authApi: 'http://dtapi.if.ua:8081/api/auth/',
  siteUrl: 'http://ec2-3-136-11-72.us-east-2.compute.amazonaws.com/',
  api: 'http://dtapi.if.ua:8081/api/',
  tokenName: 'jwt-token',
  title: 'BeLeRo.Ua',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.




// export const environment = {
//   production: false,
//   //'http://dtapi.if.ua:8081/api/auth/'
//   authApi: 'http://localhost:8080/api/auth/',
//   api: 'http://localhost:8080/api/',
//   tokenName: 'jwt-token',
//   title: 'BeLeRo.Ua',
//   user: 'user',
//   role: 'role',
//   classroom: 'class'
// };
