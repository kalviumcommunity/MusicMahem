import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Update() {
  const navigate = useNavigate()
  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }
  const token = getCookie('token')

  const [formData, setFormData] = useState({
    ID: '',
    Singer: '',
    Song: '',
    Language: '',
    Created_By: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:3000/updateuser/${formData.ID}`,{ID :formData.ID,Singer:formData.Singer,Song:formData.Song,Language:formData.Language,Created_By:formData.Created_By},{headers:{authorization:`Bearer ${token}`}})
    .then(result=>{console.log(result);
    navigate('/')})
    .catch(err=>console.log(err))
    console.log('Updated Data:', formData);
  };

  return (
    <div className='container'>
      <h2 className='title'>Update User</h2>
      <form>
      <label className='labelStyle'>ID<input type="text" name="ID" value={formData.ID} onChange={handleChange} className='formStyle' /></label>
        <label className='labelStyle'>Singer<input type="text" name="Singer" value={formData.Singer} onChange={handleChange} className='formStyle' /></label>
        <label className='labelStyle'>Song<input type="text" name="Song" value={formData.Song} onChange={handleChange} className='formStyle' /></label>
        <label className='labelStyle'>Language<input type="text" name="Language" value={formData.Language} onChange={handleChange} className='formStyle' /></label>
        <label className='labelStyle'>Created_By<input type="text" name="Created_By" value={formData.Created_By} onChange={handleChange} className='formStyle' /></label>
        <button onClick={handleSubmit} className='submitButton'>Submit</button>
      </form>
    </div>
  );
}

export default Update;
