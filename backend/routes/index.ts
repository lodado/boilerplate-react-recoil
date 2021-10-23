import * as express from 'express';
import * as path from 'path';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.render('./test', { title: 'Express' });
});

export = router;
