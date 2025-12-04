export async function loggerMiddleware(req, reply) {
  console.log({
    method: req.method,
    route: req.url,
    time: new Date().toISOString(),
    user: req.user ?? null
  });
}