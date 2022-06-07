import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    margin: 0;
    padding: 0;
  }
  
  p,
  label {
    font-family:'Verdana', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }

  body {
      p, label, span, div, h1  {
        line-height: 1.5;
        font-family: Helvetica, Arial, sans-serif;
        color: ${({ theme }) => theme.colors.text};
       }
  }
  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  audio {
    max-height: 100%;
    object-fit: contain;
    width: 100%;
    margin: auto;
  }

  #app {
    background-color: #f5f1ed;
    min-height: 100%;
    min-width: 100%;
  }

  #__next{
    height: 100%;
  }
`;

export default GlobalStyle;
