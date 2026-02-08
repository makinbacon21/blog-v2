import Sidebar from "@/components/Sidebar";

export function About() {
  return (
    <div className="p-4 h-full w-full flex flex-row justify-center items-center max-w-6xl mx-auto">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-5 gap-4">
        <Sidebar/>
        <div className="bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 md:col-span-4 p-6 flex flex-col gap-4 post overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Introduction</h1>
            <p>Hi! My name is Thomas Makin, and I’m a System Software Engineer. I graduated from Swarthmore College with a B.S. in Engineering and a B.A. in CS in 2025, and I now work on pre- and post-silicon tooling for NVDIA's Tegra System Software division. I work on open-source, school, and personal projects from the bare metal up through webdev. I do a log of personal projects with a lot of specific steps, so I figured I’d document my work here (along with some other stuff) for other people to check out and follow along with, as well as for my own benefit. Aside from programming, I love CAD design, biking, gaming, and IT stuff like server maintenance.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Communities</h1>
            <ul role="list" className="list-disc list-inside marker:text-bacongreen">
              <li><a href="https://switchroot.org">Switchroot</a></li>
              <li><a href="https://lineageos.org">LineageOS</a></li>
              <li><a href="https://sccs.swarthmore.edu">[Formerly] Swarthmore College Computer Society</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Projects</h1>
            <ul role="list" className="list-disc list-inside marker:text-bacongreen">
              <li><a href="https://git.thomasmak.in/tmakin/ack-tegra">Mainline Linux for Tegra210B01</a></li>
              <li><a href="https://wiki.switchroot.org/wiki/android/android-14-15">LineageOS 22.2 (Android 15) for Switch</a></li>
              <li><a href="https://github.com/makinbacon21/ozwpan">DKMS OZWPAN Driver Port</a></li>
              <li><a href="https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/commit/bb0a26e906619217238c81afb0c1cbb49b030708">[Done] 6GHz Channel Support for 6GHz Band</a></li>
              <li><a href="https://wiki.switchroot.org/wiki/android/android-11">[Done] LineageOS 18.1 (Android 11) for Switch</a></li>
              <li><a href="https://github.com/swat-sccs/rsd-v2">[Done] SCCS Reserved Student Digest v2</a></li>
              <li><a href="https://github.com/swat-sccs/keywind">[Done] SCCS Custom Keycloak Theme</a></li>
              <li><a href="https://github.com/swat-sccs/cygnet">[Done] SCCS Cygnet (Student Directory) v2</a></li>
              <li><a href="https://github.com/makinbacon21/mipi-mapper">[Abandoned] MIPI Mapper Board Design (DSI Connector Adapter)</a></li>
              <li><a href="https://github.com/makinbacon21/bacon_ui_lvgl">[Abandoned] LVGL Passive HUD User Interface</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Spotify</h1>
            <iframe data-testid="embed-iframe" className="rounded-lg transition duration-300 ease-in-out shadow-md hover:scale-105" src="https://open.spotify.com/embed/playlist/4gPWFfWE8VyQ7IbxI1q11n?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
