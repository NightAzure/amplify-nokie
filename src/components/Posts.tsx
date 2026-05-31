export default function Posts() {

  return (
    <div className="posts-container">
      <button>Add Post+</button>
      <div className="posts">
        <div className="post">
          <img src="" />
          <h1 className="title">title</h1>
          <p className="user">user</p>
          <p className="date">date</p>
          <div className="post-buttons">
            <button>Edit</button>
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}
