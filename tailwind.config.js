module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}", // Include ShadCN UI components
    ],
    theme: {
        extend: {
            fontFamily: {
                sherpa: ["'GD Sherpa'", "sans-serif"],
            },
            colors: {

                colors: {
                    base: "#18181B",
                    grey: "#71717A",
                    red: {
                        100: "var(--color-red-100)",
                        600: "var(--color-red-600)",
                    },
                    green: {
                        100: "var(--color-green-100)",
                        700: "var(--color-green-700)",
                    },
                    blue: {
                        100: "var(--color-blue-100)",
                        700: "var(--color-blue-700)",
                    },
                    grey: {
                        100: "var(--color-grey-100)",
                        700: "var(--color-grey-700)",
                    },
                },
            }
        },
    },
};