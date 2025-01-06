const WorkoutDetails = ({workout}) =>{
    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong></p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails