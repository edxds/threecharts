import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root, #app {
    width: 100%;
    height: 100%;

    background-color: hsl(0, 0%, 98%);

    @media (prefers-color-scheme: dark) {
      background-color: hsl(0, 0%, 7%);
    }
  }
`;
