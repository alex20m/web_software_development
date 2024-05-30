import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedback from "./feedbacks.js";

const app = new Hono();
feedback.setFeedback("1", 0);
feedback.setFeedback("2", 0);
feedback.setFeedback("3", 0);

app.get("/feedbacks/:id", async (c) => {
    const count = await feedback.getFeedback(c.req.param("id"));
    return await c.text(`Feedback ${c.req.param("id")}: ${count}`);
})

app.post("/feedbacks/:id", async (c) => {
    await feedback.incrementCount(c.req.param("id"));
})
export default app;
