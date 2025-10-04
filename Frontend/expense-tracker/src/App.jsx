import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { showNotification } from './store/uiSlice'; 

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showNotification({ 
      type: 'warning', 
      message: 'Your expense report was submitted successfully!' 
    }));
  }, [])
  

  return (
    <>
     <h1>hello</h1>   
    </>
  )
}

export default App
