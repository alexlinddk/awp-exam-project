import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";
import bcrypt from "bcryptjs";
import { getSession, commitSession } from "~/sessions.server.js";

export async function action({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    const form = await request.formData();
    const db = await connectDb();

    const user = await db.models.User.findOne({
        username: form.get("username").trim(),
    });

    let isCorrectPassword = false;

    if (user) {
        isCorrectPassword = await bcrypt.compare(
            form.get("password").trim(),
            user.password
        );
    }

    if (user && isCorrectPassword) {
        session.set("userId", user._id);
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } else {
        return json(
            { errorMessage: "User not found or password didn't match" },
            { status: 401 }
        );
    }
}

export async function loader({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    return json({
        userId: session.get("userId"),
    });
}

export default function Login() {
    const { userId } = useLoaderData();
    const actionData = useActionData();

    return (
        return (
            <div>
              <p>You are already logged in as user id {userId}.</p>
              <Form method="post" action="/logout">
                <button type="submit" className="my-3 p-2 border rounded">
                  Logout
                </button>
              </Form>
            </div>
          );
        }
        return (
          <div className="m-3">
            <h2>Log in</h2>
            {actionData?.errorMessage ? (
              <p className="text-red-500 font-bold my-3">{actionData.errorMessage}</p>
            ) : null}
            <Form method="post" className="text-inherit">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="block my-3 border rounded px-2 py-1 w-full lg:w-1/2 bg-white border-zinc-300"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="block my-3 border rounded px-2 py-1 w-full lg:w-1/2 bg-white border-zinc-300"
              />
              <div className="flex flex-row items-center gap-3">
                <button type="submit" className="my-3 p-2 border rounded">
                  Log in
                </button>
                <span className="italic">or</span>
                <Link to="/register" className="underline">
                  Sign up
                </Link>
              </div>
            </Form>
          </div>
        );
        <div className="container mx-auto shadow-md w-2/6">
            <Form method="post">
                <label htmlFor="email" className="block font-semibold mb-1">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={actionData?.values.email}
                    className={
                        `${actionData?.errors.email ? "border-2 border-red-500" : null} w-1/2`
                    }
                />
                <label htmlFor="email" className="block font-semibold mb-1">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    defaultValue={actionData?.values.password}
                    className={
                        `${actionData?.errors.password ? "border-2 border-red-500" : null} w-1/2`
                    }
                />
                <br />
                <button
                    type="submit"
                    className="mt-3 p-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded">
                    Log in
                </button>
            </Form>
        </div>
    );
}
