import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';

const Scoreboard = () => {
    const [scores, setScores] = useState([]);
    const userId = useGetUserId();

    const getScores = () => {
        axios.get("https://flappy-v2-back.vercel.app/score").then((res) => {
            // descending order
            res.data.sort((a, b) => {
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
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"2rem"}}>
            <div className='scoreboard' style={{ color: "green",textAlign:"center" }}>
                <h1>Scoreboard</h1>

                <br />
                <br />
                <br />
                {/* <button onClick={getScores}>get</button> */}

                {scores.map((score) =>
                    <div className='card' key={score?._id}>
                        <span className="name">
                            <h3>{score?.name} </h3>
                        </span>

                        <span className="score">
                            <h2>{score?.score}</h2>
                        </span>


                    </div>
                )}

                <br /><br /><br />

                {scores.filter((score) => {
                    score.score
                })}

            </div>
        </div>
    )
}

export default Scoreboard