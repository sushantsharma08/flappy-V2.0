import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import axios from "axios";
import { useGetUserId } from '../hooks/useGetUserId';
import { useCookies } from 'react-cookie'


const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const BIRD_HEIGHT = 30;
const BIRD_WIDTH = 40;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_GAP = 160;
const OBJ_SPEED = 5;



const Game = () => {
  const [birdpos, setBirdpos] = useState(300);
  const [isStart, setIsStart] = useState(false)
  const [objHeight, setobjHeight] = useState(0)
  const [objPos, setobjPos] = useState(WALL_WIDTH)
  const [Score, setScore] = useState(0);
  const [HighScore, setHighScore] = useState(0);
  const [cookies, setCookies] = useCookies(["access_token"]); 
  
c
  const handler = () => {
    if (!isStart) setIsStart(true)
    if (birdpos < BIRD_HEIGHT + 70) setBirdpos(70);
    setBirdpos((birdpos) => birdpos - 70);
  }  

  useEffect(() => {
    let intVal;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirdpos((birdpos) => birdpos + GRAVITY);
      }, 24)
    }
    return () => clearInterval(intVal)
  });

  useEffect(() => {
    let objVal
    if (isStart && objPos >= -OBJ_WIDTH) {
      objVal = setInterval(() => {
        setobjPos((objPos) => objPos - OBJ_SPEED)
      }, 35);
      return () => {
        clearInterval(objVal);
      };
    } else {
      if (isStart) setScore((score) => score + 1);
      setobjPos(WALL_WIDTH);
      setobjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
      WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;
    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 60 &&
      (topObj || bottomObj)
    ) {
      if (Score >= HighScore) {
        setHighScore(Score);
        console.log(HighScore);
      }
      setIsStart(false);
      setBirdpos(300);
      updateScore();
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);

  const updateScore = () => {
    if (cookies.access_token) {
      const userId = useGetUserId();

      axios.get(`https://flappy-v2-back.vercel.app/score/${userId}`).then((res) => {
        res.data;
        if (res.data < HighScore) {
          const res = axios.patch(`https://flappy-v2-back.vercel.app/score/${userId}`, { score: HighScore });
          console.log(res);
        }
      })
    }
  }
  return (
    <div className='home__main'>
      <div className="game">
        <Home onClick={handler}>

          <Background className='back'
            height={WALL_HEIGHT}
            width={WALL_WIDTH}>

            <Obj
              className='obj'
              height={objHeight}
              width={OBJ_WIDTH}
              top={0}
              left={objPos}
              deg={180}
            />

            <Bird className="bird"
              height={BIRD_HEIGHT}
              width={BIRD_WIDTH}
              top={birdpos}
              left={80}
            />
            <Obj
              className='obj'
              height={WALL_HEIGHT - objHeight - OBJ_GAP}
              width={OBJ_WIDTH}
              top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
              left={objPos}
              deg={0}
            />
            {!isStart && <Start>click to start</Start>}
          </Background>
        </Home>
        <ScoreShow>
          Score: {Score}
        </ScoreShow>
        <HighScoreShow>
          High Score: {HighScore}
        </HighScoreShow>
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
  margin-top:2rem;
  flex-direction:column;
  `;
  
  const Background = styled.div`
  position:relative;
  background-repeat:no-repeat;
  background-size: ${props => props.width}px ${props => props.height}px ;
  width: ${props => props.width}px;
  overflow-x: hidden;
  height:${props => props.height}px;
`;

const Bird = styled.div`
position: absolute;
background-size: ${props => props.width}px ${props => props.height}px ;
width: ${props => props.width}px;
height:${props => props.height}px;
top:${props => props.top}px;
left:${props => props.left}px;
transition:0.1s;
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

const Obj = styled.div`
position:relative;
width: ${props => props.width}px;
height:${props => props.height}px;
top:${props => props.top}px;
left:${props => props.left}px;
transform : rotate(${(props) => props.deg}deg);
// background-repeat:no-repeat;
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;
  color:green;
  // position:absolute;
`;
const HighScoreShow = styled.div`
  text-align: center;
  background: transparent;
  color:green;
  // position:absolute;
`;