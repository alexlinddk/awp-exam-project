import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";
import bcrypt from "bcryptjs";
import { getSession, commitSession } from "~/sessions.server.js";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  const session = await getSession(request.headers.get("Cookie"));
  if (form.get("password").trim() !== form.get("repeatPassword").trim()) {
    // TODO: Return a JSON response with an `errorMessage` about the passwords not matching. Status 400?
    return null;
  }

  if (form.get("password").trim()?.length < 8) {
    // TODO: Return a JSON response with an `errorMessage` about the password length. Status 400?
    return null;
  }

  const hashedPassword = await bcrypt.hash(form.get("password").trim(), 10);

  try {
    const user = await db.models.User.create({
      username: form.get("username").trim(),
      password: hashedPassword,
    });
    if (user) {
      session.set("userId", user._id);
      // TODO: Return a redirect to the home page which sets a cookie that commits the session
      return null;
    } else {
      return json(
        { errorMessage: "User couldn't be created" },
        { status: 400 }
      );
    }
  } catch (error) {
    return json(
      {
        errorMessage:
          error.message ??
          error.errors?.map((error) => error.message).join(", "),
      },
      { status: 400 }
    );
  }
}

export async function loader({ request }) {
  // TODO: Check if the session has a userId, and if so; redirect to the homepage
  return null;
}

export default function Register() {
  const actionData = useActionData();
  return (
    <div className="container mx-auto shadow-md w-2/6">
      <Form method="post">
        <label htmlFor="email" className="block font-semibold mb-1">
          Email:
        </label>
        <Input
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
        <Input
          type="password"
          name="password"
          id="password"
          defaultValue={actionData?.values.password}
          className={
            `${actionData?.errors.password ? "border-2 border-red-500" : null} w-1/2`
          }
        />
        <br />
        <label htmlFor="email" className="block font-semibold mb-1">
          Confirm password:
        </label>
        <Input
          type="password"
          name="conPassword"
          id="conPassword"
          defaultValue={actionData?.values.conPassword}
          className={
            `${actionData?.errors.conPassword ? "border-2 border-red-500" : null} w-1/2`
          }
        />
        <br />
        <button
          type="submit"
          className="mt-3 p-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded">
          Register
        </button>
        <span className="italic">or</span>
        <Link to="/login" className="underline">
          Log in
        </Link>
      </Form>
    </div>
  );
}
