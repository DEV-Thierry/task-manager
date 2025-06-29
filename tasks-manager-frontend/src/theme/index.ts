/* eslint-disable  @typescript-eslint/no-explicit-any */
import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff",
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: '"Roboto", sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "semibold",
      borderRadius: "md",
    },
    variants: {
      solid: {
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand.500",
        _hover: {
          bg: "brand.50",
        },
      },
    },
  },
  Card: {
    baseStyle: {
      p: "4",
      borderRadius: "lg",
      boxShadow: "md",
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
      },
    }),
  },
});

export default theme;
