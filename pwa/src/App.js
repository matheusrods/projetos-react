import "./assets/css/fonts.css";
import GlobalStyle from "./assets/css/global.js";
import Routes from "./routes";
import { Provider } from "mobx-react";
import { stores } from "./mobx";
import { ToastContainer, toast, Slide } from 'react-toastify';

const App = () => {
    return (
        <Provider {...stores}>
            <GlobalStyle />
            <Routes />
            <ToastContainer
                toastClassName="toast-full-container"
                autoClose={4000}
                draggable
                closeOnClick
                hideProgressBar
                transition={Slide}
                position={toast.POSITION.TOP_RIGHT}
                pauseOnHover={false}
            />
        </Provider>
    );
};

export default App;
