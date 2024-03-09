import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col p-28 px-3  gap-6 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl font-bold">Welcome to DevSpace</h1>
        <p className="text-gray-500 text-sm sm:text-base dark:text-gray-400">
          At Dev Space, we're dedicated to providing developers with a rich and
          diverse collection of blogs covering a wide range of topics related to
          various technologies. Whether you're a seasoned professional or just
          starting out in the world of coding, our platform is designed to be
          your go-to destination for insightful articles, tutorials, and
          discussions.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 hover:underline font-bold"
        >
          View all posts
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col justify-center gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl lg:text-4xl font-semibold text-center">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            {
              <Link
                to={`/search`}
                className="text-lg text-teal-600 hover:underline text-center"
              >
                View all posts
              </Link>
            }
          </div>
        )}
      </div>
      <div className="mx-5 p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
    </div>
  );
}

export default Home;
