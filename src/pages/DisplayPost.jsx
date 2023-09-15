// DisplayPost.js
import React, { useState, useEffect } from 'react';
import PostDetailModal from '../components/PostDetailModal';

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://100.25.204.246:8000/api/blogpost", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data.data);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray">
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {posts.map((post) => (
          <div className="mb-10" key={post.id}>
            <div className="rounded-xl overflow-hidden shadow-[rgba(7, 65, 210, 0.1) 0px 9px 30px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
              />
              <div className="p-5">
                <h3 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                  {post.title}
                </h3>
                <div
                  className={`text-dark-light mt-3 text-sm md:text-lg ${
                    post.expanded ? 'block' : 'truncate'
                  }`}
                >
                  {post.introduction}
                  {post.body}
                </div>

                {/* Read More Button */}
                {post.content.length > 100 && (
                  <button
                    className="text-dark-light hover:underline mt-2"
                    onClick={() => openModal(post)}
                  >
                    Read More
                  </button>
                )}

                <div className="flex justify-between flex-nowrap items-center mt-6">
                  <div className="flex items-center gap-x-2 md:gap-x-2.5">
                    <img
                      src={post.profileimage}
                      alt="post profile"
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <h5 className="font-bold italic text-dark-hard text-sm md:text-base">
                        {post.author}
                      </h5>
                      <div className="flex items-center gap-x-2">
                        <span className="italic text-dark-light text-xs md:text-sm">
                          Blog-Admin
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-dark-light italic text-sm md:text-base">
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the PostDetailModal */}
      {selectedPost && (
        <PostDetailModal
          isOpen={!!selectedPost}
          onRequestClose={closeModal}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default DisplayPost;