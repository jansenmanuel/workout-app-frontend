import React from 'react'
import Swal from 'sweetalert2'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`/api/workouts/${workout._id}`, {
                    method: 'DELETE'
                })
                const data = await res.json()

                if (res.ok) dispatch({ type: 'DELETE_WORKOUT', payload: data })

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Workout deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined " onClick={handleDelete}>delete</span>
        </div>
    )
}

export default WorkoutDetails