import {
  Links,
  Link,
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
          <Link to="/" className="hover:underline text-blue-600">
            Home
          </Link>
          <Link to="/profiles/new" className="ml-3 hover:underline text-blue-600">
            New Profile
          </Link>
          <Link to="/login" className="ml-3 hover:underline text-blue-600">
            Log in
          </Link>
          <Link to="/logout'" className="ml-3 hover:underline text-blue-600">
            Log out
          </Link>
          <Link to="/logout'" className="ml-3 hover:underline text-blue-600">
            Register
          </Link>
          <Link to="/seed'" className="ml-3 hover:underline text-blue-600">
            Database Seeding
          </Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
