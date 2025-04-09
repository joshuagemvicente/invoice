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
    route("dashboard/profile", "./routes/dashboard/profile.tsx"),
    route("dashboard/categories", "./routes/dashboard/categories/index.tsx"),
    route("dashboard/products", "./routes/dashboard/products/products.tsx"),
    route("dashboard/suppliers", "./routes/dashboard/suppliers/index.tsx"),
    route("dashboard/reports", "./routes/dashboard/reports/index.tsx"),
    route("dashboard/settings", "./routes/dashboard/settings/index.tsx"),
    route("deleteProduct", "./routes/dashboard/products/deleteProduct.tsx"),
    // route("dashboard/boards", "./routes/dashboard/boards.tsx"),
  ]),
] satisfies RouteConfig;
