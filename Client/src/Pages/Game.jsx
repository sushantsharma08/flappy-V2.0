import React,{useState,useEffect} from 'react'
import styled from "styled-components"

const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const BIRD_HEIGHT = 30;
const BIRD_WIDTH = 40;
const GRAVITY = 5;
const isStart = true;

const Game = () => {
  const [birdpos, setBirdpos] = useState(300);
  const [isStart, setIsStart] = useState(false)
  // const [birdRotate,setBirdRotate] = useState(0)

  const handler=()=>{
   if(!isStart) setIsStart(true)
    if(birdpos<BIRD_HEIGHT+60 )setBirdpos(50);
    setBirdpos((birdpos)=>birdpos-50);
    // setBirdRotate(-50);
  }

  useEffect(() => {
    let intVal;
    if(isStart&&birdpos< WALL_HEIGHT - BIRD_HEIGHT){
      intVal = setInterval(()=>{
        setBirdpos((birdpos)=>birdpos+GRAVITY);
      },24)
      // setBirdRotate(0);
    }
    return()=> clearInterval(intVal)
  });



  return (
    <div className='home__main'>
      <div className="game">
        <Home onClick={handler}>

          <Background className='back' 
          height={WALL_HEIGHT} 
          width={WALL_WIDTH}>

            <Bird className="bird" 
            height={BIRD_HEIGHT} 
            width={BIRD_WIDTH} 
            top={birdpos} 
            left={100} 
            // rotate={birdRotate}
            />
           {!isStart && <Start>click to start</Start>}
          </Background>
        </Home>
      </div>

    </div>
  )
}

export default Game

const Home = styled.div`
  position:relative;
  height:70vh;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:2rem
  `;
  
  const Background = styled.div`
  position:relative;
  background-repeat:no-repeat;
  background-size: ${props => props.width}px ${props => props.height}px ;
  width: ${props => props.width}px;
  height:${props => props.height}px;
`;

const Bird = styled.div`
position: absolute;
background-size: ${props => props.width}px ${props => props.height}px ;
width: ${props => props.width}px;
height:${props => props.height}px;
top:${props => props.top}px;
left:${props => props.left}px;
// transform: rotate(${props=>props.rotate}deg);
`;

const Start = styled.div`
  padding:1rem;
  padding-inline:1.5rem;
  background-color:black;
  color:white;
  max-width:140px;
  position:absolute;
  top:40%;
  left:35%;
  border-radius:20px
`;