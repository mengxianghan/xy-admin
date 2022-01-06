import Mock from 'mockjs'

const register = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        require(`./modules/${name}`)
    })
}

register(require.context('./modules', false, /[A-Za-z]+\.(js)$/))

Mock.setup({
    timeout: 100
})