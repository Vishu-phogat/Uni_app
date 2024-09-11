import React, { useState , useRef , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector(state => state.user);
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePercent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setformData] = useState({});
  
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  } ,[image]);


  const handleFileUpload = async(image) => {
    const maxSize = 2 * 1024 * 1024; 
    
    
    if (image.size > maxSize) {
      setImageError(true); 
      setImagePercent(0);  
      return;  
    }
  
    setImageError(false);  // Clear any previous errors if the image is valid
  
    const storage  = getStorage(app);
    const fileName = new Date().getTime() + image.name; 
    const storageRef = ref(storage, fileName); 
    const uploadTask = uploadBytesResumable(storageRef, image); // Start the file upload
  
    uploadTask.on(
      'state_changed',  // Track the changes of the uploaded file
      (snapshot) => {   // Get the snapshot info for progress tracking
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));  
      },
      (error) => {
        console.error("Error uploading file:", error);  
        setImageError(true);  
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
        <img 
          src={currentUser.profilePicture} 
          alt="profile" 
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover m-3'
          onClick={() => fileRef.current.click()} 
        /> 
        <p className='text-sm self-center'>
        {imageError ? (
          <span className='text-red-700'>{`Error Uploading Image(file < 2 MB)`}</span>
        ) : imagePercent > 0 && imagePercent <100 ? (
          <span className='text-slate-700'>{` Uploading Image: ${imagePercent} % `}</span>
        ) : imagePercent === 100 ? (
          <span className='text-green-700'>Image uploaded Successfully</span>
        ) : ''}
        </p>
        <input 
          defaultValue={currentUser.username} 
          type="text" 
          id='username' 
          placeholder='Username' 
          className='bg-slate-100 rounded-lg p-3'
        />
        <input 
          defaultValue={currentUser.email} 
          type="email" 
          id='email' 
          placeholder='email' 
          className='bg-slate-100 rounded-lg p-3'
        />
        <input 
        type="password" 
        id='password' 
        placeholder='password' 
        className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>update</button>
      </form>
      <div className="flex justify-between p-3">
        <span className='text-red-600 cursor-pointer '>Delete Account</span>
        <span className='text-red-600 cursor-pointer '>Sign out</span>
      </div>
    </div>
  )
};
