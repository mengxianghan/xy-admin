export const setupException = (app) => {
    app.config.errorHandler = (err, vm, info) => {
        console.error(err)
    }
    return app
}
