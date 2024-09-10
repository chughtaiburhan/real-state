import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loginStart,loginSuccess,loginFailure} from '../redux/user/userSlice'
import OAuth from '../components/Oauth';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const loading = useSelector((state) => state.user.loading);  // Get loading state from Redux
  const error = useSelector((state) => state.user.error);  // Get error state from Redux
  // const [loading,error]= useSelector((state) => state.user);
  // const [error,setError]=useState(null);  
  // const [loading, setLoading] = useState(false); // Add loading state
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Update formData based on the input's id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      console.log("FormData:", formData); // Log formData to check if all fields are present
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Ensure this has username, email, and password
      });
      const data = await res.json();
  
      if(data.success === false){
        dispatch(loginFailure(data.message))
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/")
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign-In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email} // Sync state with input
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password} // Sync state with input
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignIn;
