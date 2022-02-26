module.exports = {
    presets : ['@babel/preset-react'],
    plugins : ['@babel/plugin-transform-modules-commonjs',[
        'babel-plugin-transform-remove-imports', {
            'test': "\\.(less|css|scss|sass|json)"
        }
    ]]
}
