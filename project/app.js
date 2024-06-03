import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as songService from "./songService.js";


const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

let data = {
    songs: []
};

app.get("/", async (c) => {
    const retval = await songService.listSongs();
    data.songs = retval
    return await c.html(eta.render("index.eta", data))
});

app.post("/songs", async (c) =>{
    const songData = await c.req.parseBody();
    songService.addSong(songData);
    return  c.redirect("/");
});

export default app;

