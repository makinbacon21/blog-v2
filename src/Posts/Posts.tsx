import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export function Posts() {
  document.title = "Posts | thomasmak.in";
  return (
    <div className="p-4 h-full w-full flex flex-row justify-center items-center max-w-6xl mx-auto">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-5 gap-4">
        <Sidebar/>
        <div className="bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 md:col-span-4 p-6 flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
          <Feed/>
        </div>
      </div>
    </div>
  );
}

export default Posts;
