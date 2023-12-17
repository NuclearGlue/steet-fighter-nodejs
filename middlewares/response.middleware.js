const responseMiddleware = (req, res, next) => {
  if (res.locals.result) {
    res.json(res.locals.result);
  } else if (res.locals.error) {
    const status = res.locals.error.status || 500;
    res.status(status).json({ error: res.locals.error.message });
  } else {
    next();
  }
};

export { responseMiddleware };
