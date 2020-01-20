import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from '../../utils/ListFunctions'



class List extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      token: localStorage.usertoken,
      term: '',
      editDisabled: false,
      items: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.getAll(this.state.token)
  }

  onChange = event => {
    this.setState({ term: event.target.value, editDisabled: 'disabled' })
  }

  getAll = id => {
    getList(id).then(data => {
      this.setState(
        {
          term: '',
          items: [...data]
        }
      )
    })
  }

  onSubmit = e => {
    e.preventDefault()
    addToList(this.state.term, this.state.token).then(() => {
      this.getAll(this.state.token)
    })
    this.setState({ editDisabled: false })
  }

  onUpdate = e => {
    e.preventDefault()
    updateItem(this.state.term, this.state.id).then(() => {
      this.getAll(this.state.token)
    })
    this.setState({ editDisabled: false })
  }

  onEdit = (item, itemid, e) => {
    e.preventDefault()
    this.setState({
      id: itemid,
      term: item
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val).then(() => {
      this.getAll(this.state.token)
    })
  }

  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term || ''}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.task_name}</td>
                <td className="text-right">
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.task_name, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List
