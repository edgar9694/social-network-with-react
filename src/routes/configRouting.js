import Home from "../page/Home";
import Error404 from "../page/Error404";
import User from "../page/User";
import Users from "../page/Users";

export default [
    {
        path: "/users",
        exact: true,
        page: Users,
    },
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "/user/:id",
        exact: true,
        page: User,
    },
    {
        path: "*",
        page: Error404
    },
];