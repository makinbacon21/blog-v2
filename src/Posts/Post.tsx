import { useLoaderData } from "react-router";
import Sidebar from "../components/Sidebar";
import Prism from "prismjs";
import { useEffect } from "react";
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-verilog';
import 'prismjs/components/prism-bash';

export function Post() {
  const { post } = useLoaderData();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="p-4 h-full w-full flex flex-row justify-center items-center max-w-6xl mx-auto">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-5 gap-4">
        <Sidebar/>
        <div className="bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 md:col-span-4 p-6 flex flex-col gap-4 post overflow-y-auto overflow-x-hidden">
          <div className='relative p-4 rounded-md shadow-lg'>
            <img
              src={post.data.cover}
              alt={post.data.title}
              className="absolute inset-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-light dark:from-dark from-10% via-light/80 dark:via-dark/80 via-30% to-transparent to-70%"></div>
            <div className="flex flex-col z-10 pt-25 justify-end">
              <h1 className="text-3xl z-10 mb-2 font-bold">{post.data.title}</h1>
            </div>
          </div>
          <div className="z-10 justify-end">
            <div className="z-10 overflow-hidden post flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
