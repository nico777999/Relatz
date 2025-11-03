export default footerTemplates = [
    // Niente footer
    {
        start: 0,
        design: {
            dimensions: {
                height: 0,
                width: 0,
            },
            backgroundColor: "#FFFFFF",
            elements: []
        }
    },
    // Footer semplice
    {
        start: 100,
        design: {
            dimensions: {
                height: 80,
                width: "full",
            },
            backgroundColor: "#FFFFFF",
            elements: [
                {
                    type: "line",
                    position: {
                        x: "5%",
                        y: 0
                    },
                    dimensions: {
                        width: "90%",
                        height: 2
                    },
                    backgroundColor: "#333333"
                }
            ]
];