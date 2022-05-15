import 'dotenv/config';
import { httpServer } from '@shared/infra/http/app';

const port = process.env.SERVER_PORT || 3333;

console.info("\n\n🚀 Shopify Fall 2022 - OKAAAAAAAY LET'S GO!");

httpServer.listen(port, () => {
    console.info(` - Listening on port: ${port}`);
});
