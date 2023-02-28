import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { colors } from "./shared";

const ViewsCount = ({ videoId }) => {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const options = {
            method: 'GET',
            mode: "no-cors",
            headers: {
                'X-RapidAPI-Key': 'c0557c4efamshcd93e3522c4f925p1500b0jsn50f58dc496f0',
                'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
            }
        };
        
        fetch(`https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response.viewCount);
                setViewCount(response.viewCount);
            })
            .catch(err => console.error(err));
    }, [videoId])

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    
    const views = kFormatter(viewCount)

    return (
        <Text style={{
            color: colors.white,
            fontFamily: "Stem-Regular",
            marginLeft: 12,
        }}>{videoId === "" || videoId === undefined || videoId === null || !views ? 0 : views } views</Text>
    )
}

export default ViewsCount;