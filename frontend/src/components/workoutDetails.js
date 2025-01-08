import { UseWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({workout}) =>{
    const {dispatch} = UseWorkoutsContext();
    const handleClick = async () =>{
        const response = await fetch('/api/workouts/'+workout.id, {
            method:"DELETE"
        })
        const json = await response.json();

        if(reponse.ok){
            dispatch({type: 'DELETE_WORKOUT', payload:json});
        }
    }
    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails