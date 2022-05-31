import {
  Links,
  Link,
  NavLink,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script src="https://kit.fontawesome.com/504197f8e5.js" crossorigin="anonymous"></script>
      </head>
      <body className="bg-slate-100 text-slate-800 font-sans p-4">
        <header className="pb-3 mb-4 border-b-2">
          <MenuLink to="/" className="hover:underline text-blue-600">
            Home
          </MenuLink>
          <MenuLink to="/profiles/new" className="ml-3 hover:underline text-blue-600">
            New Profile
          </MenuLink>
          <MenuLink to="/login" className="ml-3 hover:underline text-blue-600">
            Log in
          </MenuLink>
          <MenuLink to="/register" className="ml-3 hover:underline text-blue-600">
            Register
          </MenuLink>
          <MenuLink to="/seed" className="ml-3 hover:underline text-blue-600">
            Database Seeding
          </MenuLink>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function MenuLink({ to, className, children }) {
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        [className, "hover:underline text-blue-600", isActive && "font-bold"]
          .filter(Boolean)
          .join(" ")
      }>
      {children}
    </NavLink>
  );
}
