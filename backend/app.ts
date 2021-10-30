import * as createError from 'http-errors';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as logger from 'morgan';

import { ResponseError } from './interface/';

import * as indexRouter from './routes/index';
import * as apiRouter from './routes/api';

const app = express();

app.set('views', './bundle');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'bundle')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});

// error handler
app.use(function (
  err: ResponseError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

export default app;
