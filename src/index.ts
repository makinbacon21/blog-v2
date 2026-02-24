import { serve } from "bun";
import index from "./index.html";

import { getPost, getPosts, type PostFile } from "./util/markdownPosts";
import { genPNG } from "./util/createImage";
import OpenGraph from "./OpenGraph/Image";

const server = serve({
  routes: {
    "/post/*": async (req) => {
      const url = new URL(req.url);

      /* handle opengraph gen */
      if (req.url.includes('/og/')) {
        const postUrl = req.url.replace('/post/og', '');
        const fetchedPost = await getPost(postUrl);
        if (!fetchedPost)
          return Response.json({ error: 'File not found' }, { status: 404 });

        const png = await genPNG(OpenGraph(fetchedPost.data.title, fetchedPost.data.cover));
        return new Response(new Uint8Array(png), {
          headers: {
            "Content-Type": "image/png",
          },
        });

      } else {
        const filePath = `./_posts${url.pathname.replace('/post', '')}`;

        const file = Bun.file(filePath);
        const exists = await file.exists();

        if (exists) {
          return new Response(file);
        }
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
