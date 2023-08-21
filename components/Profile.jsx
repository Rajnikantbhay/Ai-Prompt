import PromptCard from "./PromptCard"
const Profile = ({name, description , data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{name}</span> Profile</h1>
      <p className='desc text-left'>{description}</p>
      {/* PROFILE CARD */}
      <div className='mt-10 prompt_layout'>
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleDelte={() => handleDelete && handleDelete
        (post)} handleEdit={() => handleEdit && handleEdit(post)} />
      })}
    </div>
    </section>
  )
}

export default Profile
