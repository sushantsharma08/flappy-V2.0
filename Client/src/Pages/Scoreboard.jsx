import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';
import { useQuery } from '@tanstack/react-query'


const Scoreboard = () => {
    // const [scores, setScores] = useState([]);
    // const getScores = () => {
    //     axios.get(
    //         // "https://flappy-v2-back.vercel.app/score"
    //         "http://localhost:3001/score"

    //         ).then((res) => {
    //         // descending order
    //         res.data.sort((a, b) => {
    //             return b.score - a.score;
    //         })
    //         setScores(res.data);
    //         console.log(scores);
    //     });
    // }


    const userId = useGetUserId();

    const { data: scores, isLoading, refetch } = useQuery(
        ["scores"], () => {
            return axios.get(
                "https://flappy-v2-back.vercel.app/score"
                // "http://localhost:3001/score"

            ).then((res) =>
            // descending order
            res.data.sort((a, b) => {
                return b.score - a.score;
            })
                // res.data
                // setScores(res.data);
                // setScores(data);
                // res.data
                );
            })
            
            console.log(scores);
    if (isLoading) {
        return <div className='scoreboard' style={{textAlign:"center",width:"100vw",margin:"4rem,2rem"}}>
            <h3 style={{ color: 'gray' }}>Loading...</h3>
        </div>
    }

    // const getScores = ()=>{
        // console.log("hi");
        // }
        
        // useEffect(() => {
            //     const dataTimer = setInterval(() => {
                //         getScores();
                //     }, 3000);
                //     return () => clearInterval(dataTimer);
                // }, []);
                
                // setInterval(() => {
                    refetch();
                        // }, 3000);



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "2rem" }}>
            <div className='scoreboard' style={{ color: "green", textAlign: "center" }}>
                <h1 style={{position:"fixed",right:"47%",marginTop:"20px"}}>Scoreboard</h1>

                <br />
                <br />
                <br />
                {/* <button onClick={getScores}>get</button> */}

                {scores.map((score) =>
                    <div className='card' style={{border :score.userId===userId ? "1px solid green":"default"}} key={score?._id}>
                        <span className="name">
                            <h3>{score?.name} </h3>
                        </span>

                        <span className="score">
                            <h2>{score?.score}</h2>
                        </span> 

                    </div>
                )}
                <br />
            </div>
        </div>
    )
}

export default Scoreboard