import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// const domino = require('domino');
// const win = domino.createWindow('<body></body>');

// win['screen'] = { deviceXDPI: 1, logicalXDPI: 1 };
// win['scrollTo'] = function() {};

// global['window'] = win;
// Object.defineProperty(win.document.body.style, 'transform', {
//   value: () => {
//     return {
//       enumerable: true,
//       configurable: true,
//     };
//   },
// });
// global['document'] = win.document;
// global['navigator'] = win.navigator;

import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4300;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'client'));

// Server static files from /client
app.get('*.*', express.static(join(DIST_FOLDER, 'client'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
