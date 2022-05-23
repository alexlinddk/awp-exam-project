import { useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const profiles = await db.models.Profile.find();
  return profiles;
}

export default function Index() {
  const profiles = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remix + Mongoose</h1>
      <h2 className="text-lg font-bold mb-3">
        Here are a few of my favorite profiles:
      </h2>
      <ul className="ml-5 list-disc">
        {profiles.map((profile) => {
          return (
            <li key={profile._id}>
              <div>
                <img src={`${profile.profileImg}`} />
                <ul>
                  <p>{profile.bio}</p>
                  {profile.tags.map((tag) => {
                    <li>{tag}</li>
                  })}
                </ul>
                <p>{profile.createdAt}</p>
              </div>
              <Link
                to={`/profiles/${profile._id}`}
                className="text-blue-600 hover:underline">
                {profile._id}
              </Link>
            </li>
          );
        })}
      </ul>
    </div >
  );
}
