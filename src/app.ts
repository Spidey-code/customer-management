import express, { Request, Response, NextFunction } from 'express';
const app = express();
import routes from './routes'
import sequelizeConnection from './db/config';
import dbInit from './db/init';
import { ApiError, ErrorType } from './helpers/ApiError';
// import routes from './routes';
// import { ApiError, ErrorType, NotFoundError } from './helpers/ApiError';


const port = process.env.PORT
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `customer management Endpoints available at http://localhost:${port}/api/v1` })
})

// configure database
sequelizeConnection
dbInit()

  // Routes
app.use('/api/v1', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      console.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    console.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    console.error(err);
      return res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 

export default app;
