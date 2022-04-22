import Link from "next/link";
import Image from "next/image";
const Post = ({ post }) => {
  return (
    <div className="card">
      <Image
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
        src={post.frontmatter.cover_image}
        alt={"post cover"}
      />
      <div className="post-date">Posted on {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>
      {/* leads to dynamic [page] from the blog folder in pages */}
      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read more</a>
      </Link>
    </div>
  );
};

export default Post;
