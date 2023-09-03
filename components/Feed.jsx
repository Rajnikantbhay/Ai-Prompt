'use client'

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { DotSpinner } from '@uiball/loaders';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />;
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/prompt');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error (e.g., set an error state)
        setIsLoading(false); // Set loading to false in case of an error
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    const searchedData = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchText) ||
        post.tag.toLowerCase().includes(searchText) ||
        post.creator.username.toLowerCase().includes(searchText)
      );
    });

    setSearchResult(searchedData);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {isLoading ? (
        // Show a loading spinner while data is being fetched
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh', // 100% of the viewport height
          }}
        >
          <DotSpinner />
        </div>
      ) : (
        <PromptCardList data={searchText === '' ? posts : searchResult} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
