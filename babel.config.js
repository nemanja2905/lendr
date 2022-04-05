module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['./src/'],
                    alias: {
                        '@components': './src/components',
                        '@navigators': './src/navigators',
                        '@util': './src/util',
                        '@api': './src/api',
                        '@Models': './src/Data',
                        '@Colors': './src/constants/Colors.js',
                        '@Fonts': './src/constants/Fonts.js',
                        '@Config': './src/constants/Config.js',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
