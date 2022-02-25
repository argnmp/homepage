module.exports = {
    presets : 
    [['@babel/preset-react',{
        "flow": false,
        "typescript": true
    }],['@babel/preset-typescript',{
        "isTSX": true,
        "allExtensions": true
    }]],
    plugins : ['@babel/plugin-transform-modules-commonjs']
}
