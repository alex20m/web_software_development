const handleRequest = (request) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  

  return new Response(retval);
};

Deno.serve(handleRequest);