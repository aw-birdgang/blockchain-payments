import { Card, CardBody, Typography } from '@material-tailwind/react';
import DateComponent from '../../components/DateComponent';
import { DrawVideo } from '../../models/DrawVideo';

export default function DrawVideoCard({ drawVideo }: { drawVideo: DrawVideo }) {
    const { drawIdx, drawVideoUrl, winningDate } = drawVideo;

    return (
        <Card
            className="cursor-pointer min-w-64 md:w-full"
            onClick={() => window.open(drawVideoUrl, '_blank')}
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <CardBody>
                <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-span-5 flex justify-center gap-4">
                        <Typography variant="h5" color="white" className="col-span-2 text-end">
                            {`Draw ${drawIdx}`}
                        </Typography>

                        <Typography className="" variant="h5" color="white">
                            <DateComponent date={winningDate} />
                        </Typography>
                    </div>

                    <div className="col-start-3 row-start-2 flex justify-center items-center">
                        <img src={'/images/home/youtube.png'} alt="Play Button" className="w-12" />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
