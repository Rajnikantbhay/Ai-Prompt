'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, hanldeTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} hanldeTagClick={hanldeTagClick} />
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPost] = useState([])
  const [searchResult, setSeachResult] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPost(data);
    }
    fetchData()
  },[])


  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
    const searchedData = posts.filter((post) => {
      return post.prompt.toLowerCase().includes(searchText) || post.tag.toLowerCase().includes(searchText) || post.creator.username.toLowerCase().includes(searchText)
    });

    setSeachResult(searchedData);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      <PromptCardList data={searchText === '' ? posts : searchResult} hanldeTagClick={() => {}} />
    </section>
  )
}

export default Feed
