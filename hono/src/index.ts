import { Context, Hono } from "hono";
import { BlankEnv, BlankInput, Next } from "hono/types";

const app = new Hono();

async function authMiddleware(
  c: Context<BlankEnv, "/", BlankInput>,
  next: Next
) {
  if (c.req.header("Authorization")) {
    console.log("Authorized ✅");
    await next();
  } else {
    return c.text("You don't have access ❌");
  }
}
app.get("/users", (c) => {
  return c.json({
    message: "response from get request on /users",
  });
});

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text("Hello Hono!");
});

export default app;
