import { Global, css } from "@emotion/react";

const GlobalStyle = () => {
  return <Global styles={style} />;
};

const style = css`
  body {
    font-family: "Noto Sans KR", sans-serif;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }
  li {
    list-style: none;
  }
  * {
    padding: 0;
    box-sizing: border-box;
    margin: 0;
  }
`;

export default GlobalStyle;
