import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react';
import { FileUploader, StorageImage } from '@aws-amplify/ui-react-storage';
import { remove } from 'aws-amplify/storage';
import { downloadData } from 'aws-amplify/storage';

const client = generateClient<Schema>()

export default function Posts() {
  const [posts, setPosts] = useState<Schema["Post"]["type"][]>([]);
  const { user } = useAuthenticator();

  const editPost = async (id: string) => {
    const caption = window.prompt("Caption")
    if (!caption) return;   // stop if empty

    
  }

  const downloadPost = async (imagePath: string) => {
    try {
      const { body } = await downloadData({ path: imagePath }).result;
      const blob = await body.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imagePath.split("/").pop() ?? "download";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const deletePost = async (id: string, imagePath: string) => {
    try {
      // Delete the image file from S3 if it exists
      if (imagePath) {
        await remove({
          path: imagePath
        });
        console.log("Image deleted from S3:", imagePath);
      }

      // Delete the post from DynamoDB
      const deletedPost = await client.models.Post.delete({
        id,
      });

      console.log("Post deleted:", deletedPost);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };



  useEffect(() => {
    const sub = client.models.Post.observeQuery().subscribe({
      next: ({ items }) => {
        setPosts([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);


  const createPost = async (path: string) => {
    const caption = window.prompt("Caption");
    if (!caption) return;

    const newPost = await client.models.Post.create({
      caption,
      email: user.signInDetails?.loginId,
      userId: user.userId,
      date: new Date().toLocaleString(),
      imagePath: path,
    })

    console.log("Create Post Result: ", newPost)
  }

  const isAuthor = (author: string) => {
    if (user.userId == author) {
      return true
    } else {
      return false
    }
  }


  return (
    <div className="posts-container">
      <FileUploader
        path={({ identityId }) => `post-pictures/${identityId}/${Date.now()}-`}
        maxFileCount={1}
        onUploadSuccess={({ key }) => key && createPost(key)}
        acceptedFileTypes={['.jpg', '.gif', '.png']}
        maxFileSize={5000000} // In bytes

      />

      <div className='posts'>
        {posts.map(({ id, caption, email, userId, date, imagePath }) => (
          <div className="post" key={id}>
            {imagePath && (
              <StorageImage alt={caption ?? ""} path={imagePath} />
            )}
            <h1 className="caption">{caption}</h1>
            <p className="user">{email}</p>
            <p className="date">{date}</p>
            {isAuthor(userId!) &&
              <div className="post-buttons">

                {/* Edit and delete only for post owners */}
                {isAuthor(userId!) && (
                  <>
                    <button onClick={() => editPost(id)}>Edit</button>
                    <button onClick={() => imagePath && deletePost(id, imagePath)}>Remove</button>
                  </>
                )}

                {/* Download button available to everyone */}
                <button onClick={() => imagePath && downloadPost(imagePath)}>↓</button>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
