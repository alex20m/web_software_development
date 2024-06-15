import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedback from "./feedbacks.js";
import * as courseController from "./courseController.js"
import {
    getSignedCookie,
    setSignedCookie,
  } from "https://deno.land/x/hono@v3.12.11/helper.ts";

const app = new Hono();
const secret = "secret";

app.use("*", async (c, next) => {
  let sessionId = await getSignedCookie(c, secret, "sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    await setSignedCookie(c, "sessionId", sessionId, secret, { path: "/" });
  }
  c.req.sessionId = sessionId;
  await next();
});

app.get("/courses", courseController.showForm);
app.post("/courses", courseController.createCourse);
app.get("/courses/:id", courseController.showCourse);
app.post("/courses/:id/delete", courseController.deleteCourse);
app.post("/courses/:id/feedbacks/:rating", courseController.storeFeedback);
app.get("/courses/:id/feedbacks/:rating", courseController.showFeedback);

app.get("/feedbacks/:id", async (c) => {
    const count = await feedback.getFeedback(c.req.param("id"));
    return c.text(`Feedback ${c.req.param("id")}: ${count}`);
});

app.post("/feedbacks/:id", async (c) => {
    await feedback.incrementCount(c.req.param("id"));
    return c.redirect("/");
});

export default app;