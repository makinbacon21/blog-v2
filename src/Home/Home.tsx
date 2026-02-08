import Feed from "@/components/Feed";

interface BoxLink {
  title: string,
  iconPath: string,
  linkURL: string,
}

const apps: BoxLink[] = [
  { title: "Nextcloud", iconPath: "/public/nextcloud.svg", linkURL: "https://nextcloud.thomasmak.in" },
  { title: "Gitea", iconPath: "/public/gitea.svg", linkURL: "https://git.thomasmak.in" },
  { title: "Jellyfin", iconPath: "/public/jellyfin.svg", linkURL: "https://jellyfin.thomasmak.in" },
  { title: "Roundcube", iconPath: "/public/roundcube.svg", linkURL: "https://mail.thomasmak.in" },
];

const links: BoxLink[] = [
  { title: "GitHub", iconPath: "/public/github.svg", linkURL: "https://github.com/makinbacon21" },
  { title: "GitLab", iconPath: "/public/gitlab.svg", linkURL: "https://gitlab.com/makinbacon17" },
  { title: "LinkedIn", iconPath: "/public/linkedin.svg", linkURL: "https://www.linkedin.com/in/tmakin21/" },
  { title: "Email", iconPath: "/public/mail.svg", linkURL: "mailto:tmakin17@outlook.com" },
  { title: "X", iconPath: "/public/x.svg", linkURL: "https://x.com/makinbacon21" },
];

export function Home() {
  document.title = "Home | thomasmak.in";

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 m-4 gap-4">
      <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
        <div className="bg-light dark:bg-dark p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <h1 className="text-5xl"><strong>Hey!</strong> I'm Thomas</h1>
          <p className="text-2xl">I'm a System Software Engineer building cool stuff for work, for myself, and for the community. Welcome to my (rewritten) site!</p>
          <p className="text-xl">Currently @ <strong>NVIDIA</strong></p>
        </div>
        <div className="bg-light dark:bg-dark p-4 rounded-lg shadow-lg flex flex-row gap-4 items-center">
          <h1 className="text-2xl"><strong>Apps</strong> (Personal)</h1>
          <div className="ml-auto justify-end"/>
          <div className="flex flex-row gap-3 justify-end">
            {apps.map((app: BoxLink) => (
              <div key={app.title} className="h-10 transition duration-150 ease-in-out hover:scale-130">
                <a href={app.linkURL}>
                  <img className="h-full" src={app.iconPath} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-light dark:bg-dark p-4 rounded-lg shadow-lg flex flex-row gap-4 items-center">
          <h1 className="text-2xl"><strong>Links</strong></h1>
          <div className="ml-auto justify-end"/>
          <div className="flex flex-row gap-3 justify-end">
            {links.map((app: BoxLink) => (
              <div key={app.title} className="h-10 transition duration-150 ease-in-out hover:scale-130">
                <a href={app.linkURL}>
                  <img className="h-full" src={app.iconPath} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-light dark:bg-dark p-4 rounded-lg shadow-lg flex flex-row gap-4 items-center">
          <h1 className="text-2xl"><strong>Disclaimer</strong></h1>
          <div className="ml-auto justify-end"/>
          <div className="flex flex-col gap-1 text-right">
            <p>Opinions are my own</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        <Feed count={3} bigHover={true} />
      </div>
    </div>
  );
}

export default Home;
