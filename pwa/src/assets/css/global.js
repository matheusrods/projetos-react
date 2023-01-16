import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import colors from "../../styles/colors";

export default createGlobalStyle`

* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: Rubik;
    font-weight: 400;
}

html, body, #root {
    height: 100%;
    overflow: hidden;
    background-color: #E9EDF2;
}

a, button {
    cursor: pointer;
}

*::-webkit-scrollbar-track {
    background-color: #F4F4F4;
}

*::-webkit-scrollbar {
    width: 4px;
    background: #F4F4F4;
}

*::-webkit-scrollbar-thumb {
    background: #dad7d7;
}

*::-webkit-scrollbar-thumb:horizontal, *::-webkit-scrollbar:horizontal{
    background: #dad7d7;
    height: 4px;
}

/* Toasty Styles */

.Toastify__toast-container{
    .Toastify__toast--success{
      background-color:${colors.greenAux}
    }
    .Toastify__toast--error{
      background-color:${colors.redAux}

    }
    &.Toastify__toast-container--bottom-center
    {
      width:100%;
      left:0;
      margin-left: 0;
      padding: 0;
      bottom: 0;
      transform: translateX(0);

      .toast-full-container
      {
        border-radius: 0;

        &.Toastify__toast{
          margin-bottom:0;
          min-height:48px;
          text-align:center;
        }
        .Toastify__close-button{
          margin:6px;
        }
        .Toastify__toast-body{
          font-weight:bold;
          flex: 1;
        }
      }
    }
  }
`;
