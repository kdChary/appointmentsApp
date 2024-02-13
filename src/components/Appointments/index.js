import {Component} from 'react'

import {v4 as uidV4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentName: '', appointmentDate: '', appointmentList: []}

  onChangeName = event => {
    this.setState({appointmentName: event.target.value})
  }

  onChangeDate = event => {
    this.setState({appointmentDate: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(appointment => {
        if (id === appointment.id) {
          return {...appointment, isStarred: !appointment.isStarred}
        }
        return appointment
      }),
    }))
  }

  sortStarred = () => {
    const {appointmentList} = this.state

    const starredAppointments = appointmentList.filter(
      appointment => appointment.isStarred === true,
    )
    this.setState({
      appointmentList: starredAppointments,
    })
  }

  onSubmit = event => {
    const {appointmentName, appointmentDate, appointmentList} = this.state
    event.preventDefault()

    const newAppointmentList = {
      id: uidV4(),
      name: appointmentName,
      date: appointmentDate,
      isStarred: false,
    }

    this.setState({
      appointmentList: [...appointmentList, newAppointmentList],
      appointmentName: '',
      appointmentDate: '',
    })
  }

  renderAppointments = () => {
    const {appointmentList} = this.state

    return appointmentList.map(appointment => (
      <AppointmentItem
        key={appointment.id}
        appointmentDetails={appointment}
        toggleStar={this.toggleStar}
      />
    ))
  }

  render() {
    const {appointmentName, appointmentDate} = this.state

    return (
      <div className="app-container">
        <div className="appointment-section">
          <h1 className="title">Add Appointment</h1>
          <div className="form-section">
            <form
              className="appointment-form"
              name="form"
              onSubmit={this.onSubmit}
            >
              <div>
                <label className="input-label">
                  TITLE
                  <input
                    className="input"
                    placeholder="TITLE"
                    type="text"
                    value={appointmentName}
                    onChange={this.onChangeName}
                  />
                </label>
              </div>
              {/* className="input-label" */}
              <div>
                <label className="input-label">
                  DATE
                  <input
                    type="date"
                    className="input"
                    value={appointmentDate}
                    onChange={this.onChangeDate}
                  />
                </label>
              </div>
              <button className="form-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-card">
            <h3 className="lower-title">Appointments</h3>
            <button
              className="star-button"
              type="button"
              onClick={this.sortStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-item-list">{this.renderAppointments()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
