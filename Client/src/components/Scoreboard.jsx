import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Scoreboard = () => {
    const [scores, setScores] = useState([])

    const getScores = () => {
        axios.get("http://localhost:3001/score").then((res) => {
            // descending order
            res.data.sort((a,b)=>{
                return b.score - a.score;
            })
            setScores(res.data);
            console.log(scores);
        });
    }

    useEffect(() => {
        const dataTimer = setInterval(() => {
            getScores();
        }, 3000);
        return () => clearInterval(dataTimer);
    }, []);

    return (
        <div className='scoreboard'>
            Scoreboard

            <br />
            <br />
            <br />
            {/* <button onClick={getScores}>get</button> */}

            {scores.map((score) =>
                <div className='card' key={score?._id}>
                    <h3>{score?.name} </h3>
                    <h2>{score?.score}</h2>
                    
                </div>
            )}

            <br /><br /><br />

            {scores.filter((score)=>{
                score.score
            })}

        </div>
    )
}

export default Scoreboard