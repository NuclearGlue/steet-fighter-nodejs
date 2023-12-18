const responseMiddleware = (req, res, next) => {
  if (res.data) {
    res.status(200).json(res.data);
  } else if (res.err) {
    const status = res.err.status || 400;
    res.status(status).json({ error: 'true', message: res.err });
  } else {
    res.status(404).json({ error: true, message: 'Not Found' });
  }
};

export { responseMiddleware };
