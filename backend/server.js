import { serverPort } from "./Secret/secret.js";
import createConnection from "./DB/db.js";
import App from "./index.js";

App.listen(serverPort, async () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  await createConnection();
});
