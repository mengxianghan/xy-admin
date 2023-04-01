module.exports = {
    'src/*.{js,vue}': (filenames) => `eslint --no-cache --ext ${filenames.join(' ')} --fix`,
}
