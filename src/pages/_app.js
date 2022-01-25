import Layout from "../components/Layout";
import "../styles/globals.css";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import ToastNotification from "../components/ToastNotification";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastNotification />
      </Layout>
    </Provider>
  );
}

export default MyApp;
