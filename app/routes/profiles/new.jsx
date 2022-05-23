import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newProfile = await db.models.Profile.create({ 
      profileImg: form.get("profileImg"), 
      bio: form.get("bio"), 
      tags: form.get("tags"),
      linkedIn: form.get("linkedIn"), 
      personalWeb: form.get("personalWeb") 
    });
    return redirect(`/profiles/${newProfile._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateProfile() {
  const actionData = useActionData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
      <Form method="post">
        <label htmlFor="profileImg" className="block font-semibold mb-1">
          Profile Picture:
        </label>
        <input
          type="file"
          name="profileImg"
          id="profileImg"
          defaultValue={actionData?.values.profileImg}
          className={
            actionData?.errors.profileImg ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.profileImg && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.profileImg.message}
          </p>
        )}
        <br />
        <label htmlFor="bio" className="block font-semibold mb-1">
          Biography:
        </label>
        <input
          type="text"
          name="bio"
          id="bio"
          defaultValue={actionData?.values.bio}
          className={
            actionData?.errors.bio ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.bio && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.bio.message}
          </p>
        )}
        <br />
        <label htmlFor="tags" className="block font-semibold mb-1">
          Tags:
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          defaultValue={actionData?.values.tags}
          className={
            actionData?.errors.tags ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.tags && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.tags.message}
          </p>
        )}
        <br />
        <label htmlFor="linkedIn" className="block font-semibold mb-1">
          LinkedIn:
        </label>
        <input
          type="text"
          name="linkedIn"
          id="linkedIn"
          defaultValue={actionData?.values.linkedIn}
          className={
            actionData?.errors.linkedIn ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.linkedIn && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.linkedIn.message}
          </p>
        )}
        <br />
        <label htmlFor="personalWeb" className="block font-semibold mb-1">
          Personal Website:
        </label>
        <input
          type="text"
          name="personalWeb"
          id="personalWeb"
          defaultValue={actionData?.values.personalWeb}
          className={
            actionData?.errors.personalWeb ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.personalWeb && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.personalWeb.message}
          </p>
        )}
        <br />
        <button
          type="submit"
          className="mt-3 p-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded">
          Save
        </button>
      </Form>
    </div>
  );
}
