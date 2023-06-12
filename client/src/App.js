import AppRouter from "./router";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<AppRouter />
			<ToastContainer
				// position="top-center"
				autoClose={2000}
				closeButton={false}
				limit={5}
				newestOnTop
				// transition={Zoom}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}

export default App;
