import { useEffect, useState } from "react"


export const AdPanel = ({adData}) => {

    // console.dir(adData);

    const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);


    useEffect(()=> {
        const adInterval = setInterval(()=>{
            const nextIndex = (currentAdIndex + 1) % adData.length;
            setCurrentAdIndex(nextIndex);
        }, 10000)
        return () => clearInterval(adInterval);
    })


    if (!adData){
        return <></>
    }


    const currentAd = adData[currentAdIndex];


    const ShowImageOrVideo = (url: string) => {

        if(!url){
            return <></>
        }

        if(url.endsWith(".mp4")){
            return (
                <video src={url}
                    autoPlay
                    muted 
                    loop
                    playsInline
                />
            );
        } else {
            return <img src={url}/>
        }
    }


    return (
        <div className="overflow-clip">
            <div className="animate-[fadeInOut_300ms_ease-in-out] overflow-clip hover:cursor-pointer" key={currentAdIndex}>
                {ShowImageOrVideo(currentAd?.ads[0]?.img_url)}
            </div>
        </div>
    )

}