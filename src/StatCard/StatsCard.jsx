export default function StatsCard({
    value,
    label,
    color
}) {

    return (

        <div className={`wristband ${color}`}>

            <div className="num">
                {value}
            </div>

            <div className="lbl">
                {label}
            </div>

        </div>

    );

}