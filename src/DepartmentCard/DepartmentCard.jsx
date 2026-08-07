export default function DepartmentCard({
    department,
    checked,
    total
}) {


    const percent =
        total ? checked / total * 100 : 0;


    return (

        <div className="dept-card">


            <div className="dh">

                <span>
                    {department}
                </span>


                <span className="count">
                    {checked}/{total}
                </span>


            </div>


            <div className="bar-track">

                <div
                    className="bar-fill"
                    style={{
                        width: `${percent}%`
                    }}
                />

            </div>


        </div>


    )

}