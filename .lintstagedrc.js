module.exports = {
    'src/*.{js,vue}': (filenames) => `eslint --ext ${filenames.join(' ')} --fix`,
}
