import useDrawVideos from './useDrawVideos';
import DrawVideoCard from './DrawVideoCard';

export default function RecommandVideoView() {
    const drawVideos = useDrawVideos(1, 4);

    return (
        <>
            {drawVideos &&
                drawVideos.map((drawVideo) => (
                    <DrawVideoCard key={drawVideo.drawIdx} drawVideo={drawVideo}></DrawVideoCard>
                ))}
        </>
    );
}
