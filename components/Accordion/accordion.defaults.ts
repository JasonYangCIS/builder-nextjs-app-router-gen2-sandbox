const textBlock = (text: string, extraStyles: Record<string, string> = {}) => ({
  "@type": "@builder.io/sdk:Element" as const,
  responsiveStyles: {
    large: { textAlign: "left", display: "flex", flexDirection: "column", ...extraStyles },
  },
  component: { name: "Text", options: { text } },
});

export const defaultTitle = {
  "@type": "@builder.io/sdk:Element" as const,
  layerName: "Accordion item title",
  responsiveStyles: {
    large: {
      marginTop: "10px",
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
      paddingBottom: "10px",
    },
  },
  children: [textBlock("I am an accordion title. Click me!")],
};

export const defaultDetail = {
  "@type": "@builder.io/sdk:Element" as const,
  layerName: "Accordion item detail",
  responsiveStyles: {
    large: {
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
      marginTop: "10px",
      paddingBottom: "10px",
    },
  },
  children: [
    textBlock("I am an accordion detail, hello!", {
      paddingTop: "50px",
      paddingBottom: "50px",
    }),
  ],
};
