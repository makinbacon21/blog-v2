/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Layout, HydrateFallback } from "./Layout";

import { Home } from "./Home/Home";
import { About } from "./About/About";
import { feedLoader, postLoader } from "./components/Feed";
import { Posts } from "./Posts/Posts";
import { Post } from "./Posts/Post";

// Inject the web manifest at runtime. Doing this in HTML makes Bun's bundler
// try to resolve/hash it as a build asset; pointing at the server route avoids that.
const manifestLink = document.createElement("link");
manifestLink.rel = "manifest";
manifestLink.href = "/app.webmanifest";
document.head.appendChild(manifestLink);

function start() {
  const root = createRoot(document.getElementById("root")!);
  let router = createBrowserRouter([
    {
      Component: Layout,
      HydrateFallback: HydrateFallback,
      children: [
        {
          index: true,
          Component: Home,
          loader: feedLoader,
        },
        {
          path: "about",
          Component: About,
        },
        {
          path: "posts",
          Component: Posts,
          loader: feedLoader,
        },
        {
          path: "/feed/:title",
          Component: Post,
          loader: postLoader,
        },
      ],
    },
  ]);
  root.render(<RouterProvider router={router} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
