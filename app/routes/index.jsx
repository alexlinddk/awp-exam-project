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
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
      <div class="grid grid-cols-4 gap-7">
        {profiles.map((profile) => {
          return (
            <div key={profile._id} className="shadow-lg text-center">
              <div className="h-80">
                <img className="h-full" src={`${profile.profileImg}`} />
              </div>
              <div className="p-5 mb-6">
                <p className="text-2xl font-bold mb-3">{profile.name}</p>
                <p className="truncate ...">{profile.bio}</p>
              </div>
              <div>
                <ul>
                  {profile.tags.map((tag) => {
                    <li>
                      <p className="">{tag}</p>
                    </li>
                  })}
                </ul>
              </div>
              <div className="mb-4 flex place-content-evenly">
                <a href={`${profile.linkedId}`}><i class="fa-brands fa-linkedin fa-2xl mb-4"></i><br />LinkedIn</a>
                <a href={`${profile.personalWeb}`}><i class="fa-solid fa-user fa-2xl mb-4"></i><br />Perosnal Website</a>
              </div>
              <Link
                to={`/profiles/${profile._id}`}
                className="text-white hover:opacity-75">
                <div className="bg-black place-self-end font-bold p-5 text-lg">
                  Visit profile <i class="fa-solid fa-chevron-right fa-lg"></i>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div >
  );
}
