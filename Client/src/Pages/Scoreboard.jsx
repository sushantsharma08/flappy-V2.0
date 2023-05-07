import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId';
import { useQuery } from '@tanstack/react-query'
import ReactGA from "react-ga";

const Scoreboard = () => {
    const userId = useGetUserId();
    
    useEffect(() => {
      ReactGA.pageview(window.location.pathname)
    }, [])
    const { data: scores, isLoading, refetch } = useQuery(
        ["scores"], () => {
            return axios.get(
                "https://flappy-v2-back.vercel.app/score"
            ).then((res) =>
                // descending order
                res.data.sort((a, b) => {
                    return b.score - a.score;
                })
            );
        })

    console.log(scores);
    if (isLoading) {
        return <div className='scoreboard' style={{ textAlign: "center", width: "100vw", margin: "4rem,2rem" }}>
            <h3 style={{ color: 'gray' }}>Loading...</h3>
        </div>
    }

    refetch();



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "2rem" }}>
            <div className='scoreboard' style={{ color: "green", textAlign: "center" }}>


                <div 
                style={{
                    // border:"1px solid red",
                    marginTop:"0.1rem"
                }} 
                >
                    <div style={{ position: "sticky", right: "47%", marginTop: "20px", background: "rgb(99 206 227 / 6%)", padding: "0.5rem", margin: "auto", left: "25%", color: "rgb(80, 100, 100)", fontWeight: "900", borderRadius: "10px", fontSize: "larger" }}>
                        Scoreboard
                    </div>
                </div>


                <br />
                <br />
                <br />

                <div className='score_list'>

                    {scores.map((score, index) =>
                        <div className='card' style={{ backgroundColor:"black", border: score.userId === userId ? "1px solid green" : "default" }} key={score?._id}>
                            <span className='score-span '>{index + 1}</span>
                            <span className="score-span name">
                                <h3>{score?.name} </h3>
                            </span>

                            <span className="score-span score">
                                <h2>{score?.score}</h2>
                            </span>

                        </div>
                    )}
                </div>

                <br />

            </div >
        </div>
    )
}

export default Scoreboard