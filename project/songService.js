
const addSong = async (songData) => {
  const kv = await Deno.openKv();
  await kv.set(["song", songData.name], songData);
};

const listSongs = async () => {
  const kv = await Deno.openKv();
  const songData = await kv.list({ prefix: ["song"] });
  const songs = [];
  for await (const entry of songData) {
    if (entry != null && entry.value != null) {
      songs.push(entry.value);
    }
  }
  return songs;
};

export { addSong, listSongs };