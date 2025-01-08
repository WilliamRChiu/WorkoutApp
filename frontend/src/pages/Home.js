import { useEffect , useState} from "react"
//components
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";
import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";


const Home = () =>{
    const {workouts, dispatch} = UseWorkoutsContext();
    // const [workouts, setWorkouts] = useState(null);
    useEffect(()=>{
        const fetchWorkouts = async() =>{
            const response = await fetch('http://localhost:4000/api/workouts');
            const json = await response.json();

            if(response.ok){
                dispatch({type: "SET_WORKOUTS", payload:json});
            }
            else{

            }
        }
        fetchWorkouts();
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>{
                    return <WorkoutDetails key={workout._id} workout = {workout}/>
                })}
            </div>
            <WorkoutForm/>
        </div>
    )
}
export default Home