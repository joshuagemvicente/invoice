import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
  ]),
  route("logout", "./routes/auth/logout.tsx"),
  layout("./routes/dashboard/layout.tsx", [
    route("dashboard", "./routes/dashboard/dashboard.tsx"),
    // route("dashboard/boards", "./routes/dashboard/boards.tsx"),
  ]),
] satisfies RouteConfig;
