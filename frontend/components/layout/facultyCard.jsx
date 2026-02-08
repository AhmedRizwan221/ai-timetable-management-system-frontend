import { Link } from "react-router-dom";

export default function FacultyCard ({faculty}) {

    return(
       <Link to={`/faculty/${faculty._id}`}>
            <div>
                <h1>faculty.name</h1>
            </div>
       </Link>
    )
}

