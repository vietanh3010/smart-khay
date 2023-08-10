import useVoiceService from "@/service-hook/useVoice.service";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type VoiceBotProps = {
    text: string,
}

const VoiceBot = ({
    text
}: VoiceBotProps) => {

    const { getAudio } = useVoiceService();

    const {data} = useQuery({
        queryFn: () => getAudio(text),
        queryKey: [text]
    })
    

    return (
        <>
            {
                data?.async && 
                <audio autoPlay>
                    <source 
                        src={data.async}
                        type="audio/ogg"/>
                </audio>
            }
        </>
    )
}

export default memo(VoiceBot);