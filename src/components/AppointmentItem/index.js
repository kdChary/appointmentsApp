import {format, isValid} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props

  const {id, name, date, isStarred} = appointmentDetails

  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClicked = () => {
    const {toggleStar} = props
    toggleStar(id)
  }

  let appointmentDate
  if (isValid(new Date(date))) {
    appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  } else {
    appointmentDate = format(new Date(), 'dd MMMM yyyy, EEEE')
  }

  return (
    <li className="appointment-item">
      <div className="upper-section">
        <p className="appointment-name">{name}</p>
        <button
          className="star"
          type="button"
          data-testid="star"
          onClick={starClicked}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
      <p className="date">{appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
