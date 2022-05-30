import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {

    return redirect(`/index`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function Register() {
  const actionData = useActionData();
  return (
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
        <label htmlFor="email" className="block font-semibold mb-1">
          Confirm password:
        </label>
        <input
          type="conPassword"
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
      </Form>
    </div>
  );
}
