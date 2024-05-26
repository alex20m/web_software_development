import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const app = new Hono();

app.get("", (c) => {
    let operation = c.req.query("operation");
    let num1 = c.req.query("number1");
    let num2 = c.req.query("number2");
    let retval = "Invalid parameters";
    
    if(operation === "sum"){
        retval = num1 + num2 ?? "Invalid parameters";
    }
    if(operation === "difference"){
        retval = num1 - num2 ?? "Invalid parameters";
    }
    c.text(retval);
    
}
)
export default app;