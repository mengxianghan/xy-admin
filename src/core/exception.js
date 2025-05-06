export function setupException(app) {
  app.config.errorHandler = (err) => {
    console.error(err)
  }
  return app
}
