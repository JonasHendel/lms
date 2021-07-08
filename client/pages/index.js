import { useContext } from 'react';
import { useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../store/features/counterSlice';
import { setA } from '../store/features/counterSlice';
import { setAuth } from '../store/features/authSlice';

export default function Home() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  return <div className="min-h-screen">
    <button onClick={()=>{console.log(state)}}>state</button>
    <button onClick={()=>{dispatch(increment())}}>Increment</button>
    <button onClick={()=>{dispatch(setAuth('test'))}}>auth</button>
  </div>;
}
