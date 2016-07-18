// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  
  // Thirdparty barrels.
  'rxjs',
  'angular2-jwt',
  'ts-md5',
  'angular2-moment',
  'moment',

  // App specific barrels.
  'app',
  'app/shared',
  'app/app',
  'app/dashboard',
  'app/login',
  'app/signup',
  'app/gravatar',
  'app/apps',
  'app/error',
  'app/comment',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  if(barrelName != 'moment'){
    cliSystemConfigPackages[barrelName] = { main: 'index' };
  }else{
    cliSystemConfigPackages[barrelName] = { main: barrelName };
  }
  
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'ts-md5': 'vendor/ts-md5',
    'angular2-jwt': 'vendor/angular2-jwt',
    'angular2-moment': 'vendor/angular2-moment',
    'moment': 'vendor/moment',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
