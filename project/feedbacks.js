const setFeedback = async (Id, count) => {
    const kv = await Deno.openKv();
    await kv.set([`${Id}`], count);
  };
  
  const getFeedback = async (Id) => {
    const kv = await Deno.openKv();
    const feedback = await kv.get([Id]);
    return feedback.value; 
  };
  
  const incrementCount = async (Id) => {
    let count = await getFeedback(`${Id}`);
    count = parseFloat(count);
    count++;
    await setFeedback(`${Id}`, count);
  };
  
  export { setFeedback, getFeedback, incrementCount };