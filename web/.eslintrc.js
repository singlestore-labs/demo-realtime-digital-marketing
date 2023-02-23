// Fixes issue with ESLint not resolving the plugins based on the extended configs
// Please refer to https://github.com/eslint/eslint/issues/3458#issuecomment-648719715
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "react",
        "babel",
        "switch-case",
        "simple-import-sort",
        "import",
        "react-hooks",
        "unused-imports",
        "@singlestore/react-hooks-disable-import",
    ],
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    parserOptions: {
        sourceType: "module",
        emcaVersion: 6,
        esversion: 6,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    settings: {
        react: {
            version: "16.12.0",
        },
    },
    rules: {
        "no-undef": [0],
        "no-debugger": "error",
        "no-constant-condition": [0],
        "no-console": [0],
        "no-irregular-whitespace": [0],
        "object-shorthand": 2,
        eqeqeq: ["error"],
        "switch-case/newline-between-switch-case": [
            "error",
            "always",
            { fallthrough: "never" },
        ],
        "prefer-const": "error",

        "react/display-name": 0,
        "react/forbid-prop-types": 1,
        "react/jsx-boolean-value": 1,
        "react/jsx-curly-spacing": 1,
        "react/jsx-handler-names": 1,
        "react/jsx-key": 0,
        "react/jsx-max-props-per-line": 0,
        "react/jsx-no-bind": 0,
        "react/jsx-no-duplicate-props": 1,
        "react/jsx-no-literals": 0,
        "react/jsx-no-undef": 1,
        "react/jsx-pascal-case": [1, { ignore: ["LSM"] }],
        "jsx-quotes": 1,
        "react/jsx-sort-props": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/no-danger": 1,
        "react/no-deprecated": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-direct-mutation-state": 1,
        "react/no-is-mounted": 1,
        "react/no-multi-comp": 0,
        "react/no-set-state": 0,
        "react/no-string-refs": 1,
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 1,
        "react/react-in-jsx-scope": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": 0,
        "react/jsx-wrap-multilines": 1,
        "react/jsx-fragments": [1, "syntax"],
        "react/jsx-curly-brace-presence": [2, "never"],

        "babel/semi": [2, "always"],

        "@typescript-eslint/no-unused-vars": 0,
        "unused-imports/no-unused-imports": 2,
        "unused-imports/no-unused-vars": [
            2,
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/array-type": ["error", { default: "generic" }],

        "simple-import-sort/imports": [
            "error",
            {
                // The default grouping, but with css files at the end. This
                // prevents the currently imported styling to be overwritten by
                // imported components styling
                groups: [
                    ["^.+\\.graphql|gql$$"],
                    ["^\\u0000"],
                    ["^@?\\w"],
                    ["^[^.]"],
                    ["^\\."],
                    ["^.+\\.s?css$"],
                ],
            },
        ],
        "import/no-duplicates": "error",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
        "@singlestore/react-hooks-disable-import/react-hooks-disable-import":
            "error",
    },
};
