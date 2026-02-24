import { useLoaderData } from "react-router";
import Sidebar from "../components/Sidebar";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-verilog";
import "prismjs/components/prism-bash";

import ExpandIcon from "@/icons/ExpandIcon";
import ContractIcon from "@/icons/ContractIcon";
import type { PostFile } from "@/util/markdownPosts";

export function Post() {
  const { post }: { post: PostFile } = useLoaderData();
  const title = [post.data.title, "| thomasmak.in"].join(" ");

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [expanded]);

  return (
    <>
      <meta name="title" content={title} />
      <meta name="description" content={post.excerpt ? post.excerpt : ""} />

     	<meta property="og:type" content="website" />
     	<meta property="og:url" content={window.location.href} />
     	<meta property="og:title" content={title} />
     	<meta property="og:description" content={post.excerpt ? post.excerpt : ""} />
     	<meta property="og:image" content={post.data.path} />

     	<meta property="twitter:card" content="summary_large_image" />
     	<meta property="twitter:url" content={permalink} />
     	<meta property="twitter:title" content={title} />
     	<meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageURL} />

      <div className="p-4 h-full w-full flex flex-row justify-center items-center max-w-7xl mx-auto">
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-5 gap-4">
          <Sidebar />
          <div
            className={
              (expanded ? "fixed top-0 left-0 w-full h-full" : "") +
              " transition-all duration-150 ease-in-out bg-light dark:bg-dark rounded-lg shadow-lg col-span-1 md:col-span-4 p-6 flex flex-col gap-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-bacongreen"
            }
          >
            {expanded ? (
              <ContractIcon
                className="fixed rounded-full p-1 bg-white/60 dark:bg-dark/60 fill-dark dark:fill-white z-50 bottom-2 right-2 md:bottom-6 md:right-6 h-10 w-10 hover:md:scale-110 cursor-pointer transition-all ease-in-out duration-150"
                onClick={() => setExpanded(!expanded)}
              />
            ) : (
              <ExpandIcon
                className="fixed rounded-full p-1 bg-white dark:bg-baconpink/40 fill-dark dark:fill-white z-50 bottom-2 right-2 md:bottom-6 md:right-6 shadow-md h-10 w-10 hover:md:scale-110 cursor-pointer transition-all ease-in-out duration-150"
                onClick={() => setExpanded(!expanded)}
              />
            )}
            <div className="max-w-7xl w-full self-center relative p-4 rounded-md shadow-lg">
              <img
                src={post.data.cover}
                alt={post.data.title}
                className="absolute inset-0 h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-light dark:from-dark from-10% via-light/80 dark:via-dark/80 via-30% to-transparent to-70%"></div>
              <div className="flex flex-col z-10 pt-25 justify-end">
                <h3 className="text-lg z-10">
                  {new Date(post.data.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <h1 className="text-2xl md:text-3xl z-10 mb-2 font-bold">
                  {post.data.title}
                </h1>
              </div>
            </div>
            <div className="z-10 self-center w-full max-w-7xl justify-end">
              <div
                className="z-10 overflow-hidden post flex flex-col gap-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
