import { useLoaderData, useNavigate } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import type { PostFile } from "@/util/markdownPosts";

export async function feedLoader() {
  const response = await fetch(`/api/markdown`);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { posts: data.posts };
}

export async function postLoader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`/api/markdown?file=${params.title}`);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { post: data.posts[0] };
}

interface FeedProps {
  count?: number;
  bigHover?: boolean;
}

export function Feed({ count, bigHover } : FeedProps) {
  const { posts } = useLoaderData();
  let usedPosts : PostFile[];
  if (count)
    usedPosts = posts.slice(0, count);
  else
    usedPosts = posts;

  let navigate = useNavigate();

  const hoverClass = bigHover ? "md:hover:scale-105 md:hover:-translate-x-10" : "md:hover:scale-102";

  return (
    <div className="flex flex-col gap-4">
      {usedPosts.map((post: PostFile) => {
        const split = post.content.split('\n');
        const excerpt = (post.excerpt ? post.excerpt : [split[0], split[1]].join("\n")).split(' ').slice(0, 50).join(' ');
        if (!excerpt)
          return (<></>);
        return (
          <div onClick={() => navigate(`/feed/${post.data.path}`)} key={post.data.title} className={'relative cursor-pointer p-4 rounded-lg shadow-lg pt-25 overflow-hidden transition duration-150 ease-in-out ' + hoverClass}>
            <img
              src={post.data.cover}
              alt={post.data.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-light dark:from-dark from-10% via-light/80 dark:via-dark/80 via-50% to-transparent to-70%"></div>
            <div className="flex flex-col z-10 justify-end">
              <h1 className="text-2xl z-10 font-bold">{post.data.title}</h1>
              <h3 className="text-lg z-10 mb-2">{(new Date(post.data.date)).toLocaleDateString('en-US', { month: "short", day: "numeric", year: "numeric" })}</h3>
              <div className="z-10 overflow-hidden feed" dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Feed;
