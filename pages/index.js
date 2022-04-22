import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Image from "next/image";
import Post from "../components/Post";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Dev Blog - TM</title>
      </Head>

      <div className="posts">
        {posts.map((post, i) => (
          <Post post={post} key={i}></Post>
        ))}
      </div>
    </div>
  );
}
// runs on server side
export async function getStaticProps() {
  // fetch data for static site
  const files = fs.readdirSync(path.join("posts")); //test.md

  // get slug from posts
  const posts = files.map((file) => {
    // create slug
    const slug = file.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf8");
    console.log(markdownWithMeta); // stuff inside test.md

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  console.log(posts); // [{slug: 'test'}]
  return {
    props: {
      posts: posts,
    },
  };
}
