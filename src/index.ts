import * as express from 'express';
import * as dotenv from 'dotenv';
import * as swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require('../swagger/swagger.json');

dotenv.config();

import { DBrouter } from './routes/db.router';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', DBrouter);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
