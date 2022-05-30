import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const profile = await db.models.Profile.findById(params.profileId);
  if (!profile) {
    throw new Response(`Couldn't find profile with id ${params.profileId}`, {
      status: 404,
    });
  }
  return json(profile);
}

export default function ProfilePage() {
  const profile = useLoaderData();
  return (
    <div className="container mx-auto w-1/2 shadow-md">
      <div className="overflow-hidden">
        <img src={`${profile.profileImg}`} />
      </div>
      <div className="mb-11 p-10">
        <p>{profile.bio}</p>
      </div>
      <div className="mb-11">
        <ul>
          {profile.tags.map((tag) => {
            <li>
              <p>{tag}</p>
            </li>
          })}
        </ul>
      </div>
      <div className="mb-11 flex justify-center">
        <a className="mx-6 text-center" href={`${profile.linkedId}`}><i class="fa-brands fa-linkedin fa-2xl mb-4"></i><br />LinkedIn</a>
        <a className="mx-6 text-center" href={`${profile.personalWeb}`}><i class="fa-solid fa-user fa-2xl mb-4"></i><br />Perosnal Website</a>
      </div>
      <p className="mx-auto p-6 text-center">{profile.createdAt}</p>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
