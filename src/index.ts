import { serve } from "bun";
import index from "./index.html";
import llms from "./llms.txt";
import manifest from "./app.webmanifest" with { type: "text" };

import { getPost, getPosts, type PostFile } from "./util/markdownPosts";

const server = serve({
  routes: {
    "/post/*": async (req) => {
      const url = new URL(req.url);
      const filePath = `./_posts${url.pathname.replace('/post', '')}`;

      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (exists) {
        return new Response(file);
      }

      return Response.json({ error: 'File not found' }, { status: 404 });
    },

    "/public/*": async (req) => {
      const url = new URL(req.url);
      const filePath = `./${url.pathname}`;

      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (exists) {
        return new Response(file);
      }

      return Response.json({ error: 'File not found' }, { status: 404 });
    },

    "/api/markdown": {
      async GET(req) {
        const url = new URL(req.url);
        const file = url.searchParams.get('file');

        let posts: PostFile[] = [];
        if (file) {
          const fetchedPost = await getPost(file);
          if (!fetchedPost)
            return Response.json({ error: 'File not found' }, { status: 404 });

          posts.push(fetchedPost);
        } else {
          const fetchedPosts = await getPosts();
          if (!fetchedPosts)
            return Response.json({ error: 'Files not found' }, { status: 404 });

          posts = fetchedPosts;
        }

        try {
          return Response.json({
            posts,
          });
        } catch (error) {
          return Response.json({ error: 'Failed to respond' }, { status: 500 });
        }
      },
    },

    "/llms.txt": new Response(llms),

    "/app.webmanifest": new Response(manifest),

    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
