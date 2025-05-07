import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("role/list", "routes/role/list.tsx"),
  route("role/create", "routes/role/create.tsx"),
  route("role/edit/:id", "routes/role/edit.tsx"),
  route("user/list", "routes/user/list.tsx"),
  route("user/create", "routes/user/create.tsx"),
  route("user/edit/:id", "routes/user/edit.tsx"),
  route("team/list", "routes/team/list.tsx"),
  route("team/create", "routes/team/create.tsx"),
  route("team/edit/:id", "routes/team/edit.tsx"),
  route("sample/list", "routes/sample/list.tsx"),
  route("sample/create", "routes/sample/create.tsx"),
  route("sample/edit/:id", "routes/sample/edit.tsx"),
] satisfies RouteConfig;
