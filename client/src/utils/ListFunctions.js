import axios from 'axios'
import jwtdecode from 'jwt-decode'

export const getList = userId => {
  return axios
    .get(`/todos/tasks?user=${jwtdecode(userId).id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res.data
    })
}

export const addToList = (term, userId) => {
  return axios
    .post(
      '/todos/task',
      {
        task_name: term,
        user_id: jwtdecode(userId).id
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
}

export const deleteItem = term => {
  return axios
    .delete(`/todos/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const updateItem = (term, id) => {
  return axios
    .put(
      `/todos/task/${id}`,
      {
        task_name: term
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
}
