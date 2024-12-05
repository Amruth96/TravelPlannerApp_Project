import React, { useState, useEffect } from 'react';  
import './TripDetails.css'; 

const TripDetails = () => {
  // State to hold all the trips
  const [trips, setTrips] = useState(JSON.parse(localStorage.getItem('trips')) || []);
  
  // State for managing a new or edited trip
  const [newTrip, setNewTrip] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    activities: [],
    expenses: [],
    companions: [],
  });

  // State to track which trip is being edited
  const [editIndex, setEditIndex] = useState(null);
  
  // State for holding error messages, like date validation errors
  const [error, setError] = useState('');

  // useEffect hook runs whenever trips state changes, saving trips to localStorage
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));  // Save trips to localStorage
  }, [trips]);  

  // Handle input field changes and update the newTrip state
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructure the name and value from the input element
    setNewTrip((prev) => ({ ...prev, [name]: value }));  // Update the specific field in newTrip state
  };

  // Handle adding a new trip to the trips array
  const handleAddTrip = () => {
    // Check if the end date is before the start date, if so, show an error
    if (newTrip.endDate < newTrip.startDate) {
      setError('End date cannot be before the start date.');
      return;
    }

    // Add the new trip to the trips list
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    
    // Reset the newTrip state after adding the trip
    setNewTrip({ startDate: '', endDate: '', destination: '', activities: [], expenses: [], companions: [] });
    setError('');  // Clear any previous errors
  };

  // Handle editing an existing trip by setting the trip data to the form
  const handleEditTrip = (index) => {
    setEditIndex(index);  // Set the index of the trip being edited
    setNewTrip(trips[index]);  // Set the trip data to the newTrip state
  };

  // Handle saving the edited trip data
  const handleSaveEdit = () => {
    // Validate the dates before saving the edit
    if (newTrip.endDate < newTrip.startDate) {
      setError('End date cannot be before the start date.');
      return;
    }

    // Update the trip in the trips array with the edited values
    const updatedTrips = [...trips];
    updatedTrips[editIndex] = newTrip;

    // Save the updated trips and reset the state
    setTrips(updatedTrips);
    setEditIndex(null);  // Reset edit mode
    setNewTrip({ startDate: '', endDate: '', destination: '', activities: [], expenses: [], companions: [] });
    setError('');  // Clear error messages
  };

  // Handle deleting a trip from the trips array
  const handleDeleteTrip = (index) => {
    setTrips(trips.filter((_, i) => i !== index));  // Remove the trip at the specified index
  };

  // Handle adding a new activity by prompting the user for input
  const handleAddActivity = () => {
    const activity = prompt('Enter the activity:');  // Prompt user to input an activity
    if (activity) {
      setNewTrip((prev) => ({
        ...prev,
        activities: [...prev.activities, activity],  // Add the new activity to the activities array
      }));
    }
  };

  // Handle removing an activity from the activities array
  const handleRemoveActivity = (activity) => {
    setNewTrip((prev) => ({
      ...prev,
      activities: prev.activities.filter((act) => act !== activity),  // Filter out the activity to remove it
    }));
  };

  // Handle adding a new expense by prompting the user for input
  const handleAddExpense = () => {
    const expense = prompt('Enter the expense:');  // Prompt user to input an expense
    if (expense) {
      setNewTrip((prev) => ({
        ...prev,
        expenses: [...prev.expenses, expense],  // Add the new expense to the expenses array
      }));
    }
  };

  // Handle removing an expense from the expenses array
  const handleRemoveExpense = (expense) => {
    setNewTrip((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((exp) => exp !== expense),  // Filter out the expense to remove it
    }));
  };

  // Handle adding a new companion by prompting the user for input
  const handleAddCompanion = () => {
    const companion = prompt('Enter the travel companion name:');  // Prompt user to input a companion's name
    if (companion) {
      setNewTrip((prev) => ({
        ...prev,
        companions: [...prev.companions, companion],  // Add the new companion to the companions array
      }));
    }
  };

  // Handle removing a companion from the companions array
  const handleRemoveCompanion = (companion) => {
    setNewTrip((prev) => ({
      ...prev,
      companions: prev.companions.filter((comp) => comp !== companion),  // Filter out the companion to remove it
    }));
  };

  return (
    <div className="container">
      <h2>Trip Details</h2>
      {error && <p className="error">{error}</p>}  {/* Display error message if there is one */}

      {/* Display form to add or edit trip */}
      <h3>{editIndex !== null ? 'Edit Trip' : 'Add New Trip'}</h3>
      <form>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={newTrip.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={newTrip.endDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Destination:</label>
          <input type="text" name="destination" value={newTrip.destination} onChange={handleChange} required />
        </div>

        {/* Activities Section */}
        <div className="activities">
          <h4>Activities</h4>
          <button type="button" onClick={handleAddActivity}>Add Activity</button>
          <ul>
            {newTrip.activities.map((activity, index) => (
              <li key={index}>
                {activity}
                <button type="button" onClick={() => handleRemoveActivity(activity)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Expenses Section */}
        <div className="expenses">
          <h4>Expenses</h4>
          <button type="button" onClick={handleAddExpense}>Add Expense</button>
          <ul>
            {newTrip.expenses.map((expense, index) => (
              <li key={index}>
                {expense}
                <button type="button" onClick={() => handleRemoveExpense(expense)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Companions Section */}
        <div className="companions">
          <h4>Travel Companions</h4>
          <button type="button" onClick={handleAddCompanion}>Add Companion</button>
          <ul>
            {newTrip.companions.map((companion, index) => (
              <li key={index}>
                {companion}
                <button type="button" onClick={() => handleRemoveCompanion(companion)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add or Save Button */}
        <div>
          {editIndex !== null ? (
            <button type="button" onClick={handleSaveEdit}>Save Edit</button>
          ) : (
            <button type="button" onClick={handleAddTrip}>Add Trip</button>
          )}
        </div>
      </form>

      {/* Display List of Trips */}
      <h3>Your Trips</h3>
      <ul className="trips-list">
        {trips.map((trip, index) => (
          <li key={index}>
            <strong>{trip.destination}</strong> ({trip.startDate} - {trip.endDate})
            <button onClick={() => handleEditTrip(index)}>Edit</button>
            <button onClick={() => handleDeleteTrip(index)}>Delete</button>
            <div>
              <h4>Activities:</h4>
              <ul>
                {trip.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Expenses:</h4>
              <ul>
                {trip.expenses.map((expense, i) => (
                  <li key={i}>{expense}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Travel Companions:</h4>
              <ul>
                {trip.companions.map((companion, i) => (
                  <li key={i}>{companion}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripDetails;  
