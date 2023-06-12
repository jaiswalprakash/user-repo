import React from "react";
import { useRoutes } from "react-router-dom";
import Host from "./components/UserView";

function AppRouter() {
	return useRoutes([
		{
			path: "*",
			element: <Host />
		}
	]);
}

export default AppRouter;
