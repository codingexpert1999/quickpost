import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ToastContainer } from 'react-toastify'
import { loadUser } from './actions/userActions';
import Navbar from './components/Navbar';
import Routes from './components/routes/Routes';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [])

  useEffect(() => {
    if(isAuthenticated){
      history.push("/dashboard");
    }
  }, [isAuthenticated])

  return (
    <React.Fragment>
      <Navbar/>

      <Routes/>

      <ToastContainer position="bottom-right" />
    </React.Fragment>
  );
}

export default App;
