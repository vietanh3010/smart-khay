import useVoiceService from "@/service-hook/useVoice.service";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";

type VoiceBotProps = {
    text: string,
}

const VoiceBot = ({
    text
}: VoiceBotProps) => {

    const { getAudio } = useVoiceService();
    const [audioSrc, setAudioSrc] = useState<string>();

    const {data} = useQuery({
        queryFn: () => getAudio(text),
        queryKey: [text],
    })
    
    useEffect(() => {
        if(!data?.async) return;
        setAudioSrc(data.async)
    }, [data])

    return (
        <>
            {
                audioSrc && 
                <audio 
                    autoPlay
                    onError={() => {
                        setAudioSrc(undefined);
                        setTimeout(() => {
                            setAudioSrc(audioSrc)
                        }, 1000)
                    }}
                    onEnded={() => setAudioSrc(undefined)}
                    >
                    <source 
                        src={audioSrc}
                        type="audio/ogg"/>
                </audio>
            }
        </>
    )
}

export default memo(VoiceBot);