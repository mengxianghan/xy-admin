module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'import',
            {
                libraryName: '@icon-park/vue',
                libraryDirectory: 'es/icons',
                camel2DashComponentName: false // default: true,
            }
        ]
    ]
}
