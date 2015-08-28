/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import path from 'path';
import serialize from 'serialize-javascript';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import riotService from './services/riot';

const htmlComponent = React.createFactory(HtmlComponent);
const env = process.env.NODE_ENV;

const debug = debugLib('illuminate');

const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));

const fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(riotService);
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(compression());

server.use((req, res, next) => {
  let context = app.createContext({
    req: req
  });

  const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

  debug('Rendering Application component into html');
  const html = React.renderToStaticMarkup(htmlComponent({
    clientFile: env === 'production' ? 'main.min.js' : 'main.js',
    context: context.getComponentContext(),
    state: exposed,
    markup: React.renderToString(createElementWithContext(context))
  }));

  debug('Sending markup');
  res.type('html');
  res.write('<!DOCTYPE html>' + html);
  res.end();
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
