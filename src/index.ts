import app from "./app.js";
import { env } from "./middleware/config.js";

app.listen(env.PORT, () => {
    console.log(`Server is listening on http://localhost:${env.PORT}`);
});