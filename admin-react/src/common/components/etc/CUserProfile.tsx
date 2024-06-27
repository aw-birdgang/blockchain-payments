import { USER_GRADE } from '@/common/models/interfaces';

export default function CUserProfile(props: {
    email: string
    icon: USER_GRADE
    onClick: Function
}) {
    let icon = <div className={'px-1.5 text-xs font-medium bg-primary rounded-md text-white flex flex-row justify-center items-center'}>
        {props.icon === USER_GRADE.ADMIN ? `AD` :
            props.icon === USER_GRADE.MANAGER ? `MA` :
                props.icon === USER_GRADE.AGENT ? `AG` :
                    props.icon === USER_GRADE.SELLER ? `SE` :
                        props.icon === USER_GRADE.PLAYER ? `PL` : 'AD'}
    </div>;
    return <div
        className={'text-text hover:text-blue-700 cursor-pointer flex flex-row gap-x-1 items-center'}
        onClick={() => props.onClick()}
        data-testid='test'
    >
        {icon}
        <div className={'underline'}>{props.email}</div>
    </div>;
}