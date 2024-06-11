import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as feedback from "./feedbacks.js";
import * as courseController from "./courseController.js"

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

app.get("/courses", courseController.showForm);
app.post("/courses", courseController.createCourse);
app.get("/courses/:id", courseController.showCourse);
app.post("/courses/:id/delete", courseController.deleteCourse);
app.post("/courses/:id/feedbacks/:rating", courseController.storeFeedback);
app.get("/courses/:id/feedbacks/:rating", courseController.showFeedback);

app.get("/feedbacks/:id", async (c) => {
    const count = await feedback.getFeedback(c.req.param("id"));
    return c.text(`Feedback ${c.req.param("id")}: ${count}`);
})

app.post("/feedbacks/:id", async (c) => {
    await feedback.incrementCount(c.req.param("id"));
    return c.redirect("/");
})

export default app;