/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCarPage.css"; // Import the CSS file
import { createCar } from "../../utils/api";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
// Define enums to match backend validation
const carTypes = ['Sedan', 'SUV', 'Convertible', 'Hatchback'];
const transmissionTypes = ['Manual', 'Automatic', 'Semi-Automatic', 'IMT'];
const capacityTypes = ['2 People', '4 People', '7 People'];
const fuelTypes = ['electric', 'diesel', 'hybrid', 'petrol', 'GAS', 'hydrogen'];

// Feature options for UI selection
const featureOptions = {
  "Safety & Driver Assistance" :{
    TPMS : 'Tire Pressure Monitoring System (TPMS)',
    SIDE : 'Side',
    LDW : 'Lane Departure Warning (LDW)',
    REAR_CAMERA : 'Rearview Camera',
    TRACTION : 'Traction Control',
    ESC : 'Electronic Stability Control (ESC)',
    AEB : 'Automatic Emergency Braking (AEB)',
    CURTAIN : 'Curtain)',
    ABS : 'Anti-lock Braking System (ABS)',
    ACC : 'Adaptive Cruise Control (ACC)',
  },
  
 'Infotainment & Connectivity' :{
    VOICE : 'Voice Recognition',
    WIFI : 'Wi-Fi Hotspot',
    NAV : 'Navigation System',
    AUDIO : 'Premium Audio System',
  },
  
   'Comfort & Convenience' :{
    CRUISE : 'Cruise Control',
    REMOTE_START : 'Remote Engine Start',
    CUPHOLDERS : 'Cupholders',
    POWER_SEAT : "Power-Adjustable Driver's Seat",
    STORAGE : 'Ample Storage Compartments',
    WIRELESS_CHARGING : 'Wireless Phone Charging',
    CLIMATE : 'Automatic Climate Control',
    KEYLESS : 'Keyless Entry / Push-Button Start',
    WINDOWS_LOCKS : 'Power Windows & Locks',
    HEATED_SEATS : 'Heated Seats',
    STEERING_CONTROLS : 'Steering Wheel Controls',
  },
  
  'Performance & Efficiency' :{
    ECO : 'Eco',
    SPORT : 'Sport)',
    AWD : 'All-Wheel Drive (AWD)',
    SELECTABLE_MODES : 'Selectable Drive Modes (e.g.',
    EFFICIENT_ENGINE : 'Fuel-Efficient Engine (e.g.',
  },
  
   'Exterior & Lighting' :{
    SIDE_MIRRORS : 'Power Side Mirrors',
  } 
};

const PostCarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);
  // Initialize form with structure we'll transform to API payload
  const [formData, setFormData] = useState({
    seller: user?.id || "", // user id
    likeCount: 0,
    manifacture: "",
    model: "",
    cost: 0,
    car_card: {
      brand: "",
      type: "Sedan",
      currency: "USD",
      details: {
        transmission: "Automatic",
        capacity: "4 People" // kept for dropdown but seats stored separately
      }
    },
    description: "",
    engine: {
      fuelType: "petrol",
      capacity_liters: 2.0,
      horsepower: 150,
      cylinders: 4,
      fuelcapacity: 50
    },
    // New fields to align with API
    imagesText: "", // comma-separated urls for UI
    images: [],
    isFeatured: false,
    seats: 4,
    mileage_km: 500,
    features: {
      'Safety & Driver Assistance': [],
      'Infotainment & Connectivity': [],
      'Comfort & Convenience': [],
      'Performance & Efficiency': [],
      'Exterior & Lighting': []
    },
    color: {
      exterior: "",
      interior: ""
    },
    user: user
  });

  // Handle nested form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle nested properties using dot notation in name attribute
    if (name.includes('.')) {
      const parts = name.split('.');
      setFormData(prevData => {
        const newData = { ...prevData };
        // Handle three levels of nesting
        if (parts.length === 2) {
          newData[parts[0]] = {
            ...newData[parts[0]],
            [parts[1]]: type === 'number' ? Number(value) : value
          };
        } else if (parts.length === 3) {
          newData[parts[0]] = {
            ...newData[parts[0]],
            [parts[1]]: {
              ...newData[parts[0]][parts[1]],
              [parts[2]]: type === 'number' ? Number(value) : value
            }
          };
        }

        return newData;
      });
    } else {
      // Handle top-level properties
      setFormData(prevData => ({

        ...prevData,
        [name]: type === 'number' ? Number(value) : (type === 'checkbox' ? e.target.checked : value)
      }));
    }
  };


  const toggleFeature = (category, feature, isChecked) => {
    setFormData(prev => {
      const current = prev.features[category] || [];
      const updated = isChecked ? [...current, feature] : current.filter(f => f !== feature);
      console.log(prev);
      return {
        ...prev,
        features: {
          ...prev.features,
          [category]: updated
        }
      };
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setFormData(prevData => ({
      ...prevData,
      images: urls.join(', '),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format data for API
      // Build payload matching backend example
      const carData = {
        seller: formData.seller,
        manifacture: formData.manifacture,
        model: formData.model,
        likeCount: formData.likeCount,
        brand: formData.car_card.brand,
        type: formData.car_card.type,
        price: Number(formData.cost),
        currency: formData.car_card.currency,
        seats: Number(formData.seats),
        transmission: formData.car_card.details.transmission,
        color: formData.color.exterior,
        description: formData.description,
        images: formData.imagesText.split(',').map(u => u.trim()).filter(u => u),
        engine: {
          fuelType: formData.engine.fuelType,
          capacity_liters: Number(formData.engine.capacity_liters),
          horsepower: Number(formData.engine.horsepower),
          cylinders: Number(formData.engine.cylinders),
          fuelcapacity: Number(formData.engine.fuelcapacity)
        },
        mileage_km: Number(formData.mileage_km),
        liked: false,
        isFeatured: Boolean(formData.isFeatured),
        features: formData.features,
        user: formData.user
      };


      console.log("Submitting car data:", carData);

      const response = await createCar(carData);
      console.log("Car created successfully:", response);
      setSuccess(true);

      // Redirect to cars page after 2 seconds
      setTimeout(() => {
        navigate('/cars');
      }, 2000);
    } catch (err) {
      console.error("Error creating car:", err);
      setError(err.response.data || "Failed to create car listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='post-car-page-container'>
      <h1 className='page-title'>List New Vehicle</h1>

      {/* Success and Error Messages */}
      {success && (
        <div className="success-message">
          Car listing created successfully! Redirecting to cars page...
        </div>
      )}

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='form-container'>
        {/* Basic Car Information */}
        <div className='form-section'>
          <h2 className='section-title'>Basic Information</h2>
          <div className='form-grid'>
            <div>
              <label htmlFor='manifacture' className='form-label'>
                Manufacturer *
              </label>
              <input
                type='text'
                id='manifacture'
                name='manifacture'
                placeholder='e.g., Toyota'
                className='form-input'
                value={formData.manifacture}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <label htmlFor='model' className='form-label'>
                Model *
              </label>
              <input
                type='text'
                id='model'
                name='model'
                placeholder='e.g., 2000'
                className='form-input'
                value={formData.model}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <label htmlFor='seats' className='form-label'>Seats</label>
              <input type='number' id='seats' name='seats' min='1' max='9' className='form-input' value={formData.seats} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Car Card Information */}
        <div className='form-section'>
          <h2 className='section-title'>Car Details</h2>
          <div className='form-grid'>
            <div>
              <label htmlFor='car_card.brand' className='form-label'>
                Brand *
              </label>
              <input
                type='text'
                id='car_card.brand'
                name='car_card.brand'
                placeholder='e.g., Toyota'
                className='form-input'
                value={formData.car_card.brand}
                onChange={handleChange}
                autoSave="on"
              />
            </div>
            <div className='form-section'>
              <h2 className='section-title'>Condition</h2>
              <div className='form-grid'>

                <div>
                  <label htmlFor='mileage_km' className='form-label'>
                    Mileage (km) *
                  </label>
                  <input
                    type='number'
                    id='mileage_km'
                    name='mileage_km'
                    placeholder='e.g., 5000'
                    min="500"
                    max="500000"
                    className='form-input'
                    value={formData.mileage_km}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
            </div>
            <div className='select-wrapper'>
              <label htmlFor='car_card.type' className='form-label'>
                Car Type *
              </label>
              <select
                id='car_card.type'
                name='car_card.type'
                className='form-select'
                value={formData.car_card.type}
                onChange={handleChange}
                
              >
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className='select-arrow'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='form-grid'>

            <div>
              <label htmlFor='car_card.currency' className='form-label'>
                Currency *
              </label>
              <input
                type='text'
                id='car_card.currency'
                name='car_card.currency'
                placeholder='e.g., USD'
                className='form-input'
                value={formData.car_card.currency}
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div className='form-grid'>
            <div className='select-wrapper'>
              <label htmlFor='car_card.details.transmission' className='form-label'>
                Transmission *
              </label>
              <select
                id='car_card.details.transmission'
                name='car_card.details.transmission'
                className='form-select'
                value={formData.car_card.details.transmission}
                onChange={handleChange}
                
              >
                {transmissionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className='select-arrow'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
            <div className='select-wrapper'>
              <label htmlFor='car_card.details.capacity' className='form-label'>
                Seating Capacity *
              </label>
              <select
                id='car_card.details.capacity'
                name='car_card.details.capacity'
                className='form-select'
                value={formData.car_card.details.capacity}
                onChange={handleChange}
                
              >
                {capacityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className='select-arrow'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cost and Mileage */}
        <div className='form-section'>
          <h2 className='section-title'>Pricing</h2>
          <div className='form-grid'>
            <div>
              <label htmlFor='cost' className='form-label'>
                Cost (USD) *
              </label>
              <input
                type='number'
                id='cost'
                name='cost'
                placeholder='e.g., 25000'
                min="1000"
                max="1000000"
                className='form-input'
                value={formData.cost}
                onChange={handleChange}
                
              />
            </div>
          </div>
        </div>

        {/* Engine Information */}
        <div className='form-section'>
          <h2 className='section-title'>Engine Specifications</h2>
          <div className='form-grid'>
            <div className='select-wrapper'>
              <label htmlFor='engine.fuelType' className='form-label'>
                Fuel Type *
              </label>
              <select
                id='engine.fuelType'
                name='engine.fuelType'
                className='form-select'
                value={formData.engine.fuelType}
                onChange={handleChange}
                
              >
                {fuelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className='select-arrow'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor='engine.capacity_liters' className='form-label'>
                Engine Capacity (liters) *
              </label>
              <input
                type='number'
                id='engine.capacity_liters'
                name='engine.capacity_liters'
                placeholder='e.g., 2.5'
                min="0.5"
                max="6"
                step="0.1"
                className='form-input'
                value={formData.engine.capacity_liters}
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div className='form-grid'>
            <div>
              <label htmlFor='engine.horsepower' className='form-label'>
                Horsepower *
              </label>
              <input
                type='number'
                id='engine.horsepower'
                name='engine.horsepower'
                placeholder='e.g., 200'
                min="50"
                max="2000"
                className='form-input'
                value={formData.engine.horsepower}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <label htmlFor='engine.cylinders' className='form-label'>
                Cylinders *
              </label>
              <input
                type='number'
                id='engine.cylinders'
                name='engine.cylinders'
                placeholder='e.g., 4'
                min="4"
                max="12"
                className='form-input'
                value={formData.engine.cylinders}
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div>
            <label htmlFor='engine.fuelcapacity' className='form-label'>
              Fuel Capacity (liters) *
            </label>
            <input
              type='number'
              id='engine.fuelcapacity'
              name='engine.fuelcapacity'
              placeholder='e.g., 60'
              min="0"
              max="100"
              className='form-input'
              value={formData.engine.fuelcapacity}
              onChange={handleChange}
              
            />
          </div>
        </div>

        {/* Color Information */}
        <div className='form-section'>
          <h2 className='section-title'>Color</h2>
          <div className='form-grid'>
            <div>
              <label htmlFor='color.exterior' className='form-label'>
                Exterior Color
              </label>
              <input
                type='text'
                id='color.exterior'
                name='color.exterior'
                placeholder='e.g., Red'
                className='form-input'
                value={formData.color.exterior}
                onChange={handleChange}
                
              />
            </div>
            <div>
              <label htmlFor='color.interior' className='form-label'>
                Interior Color
              </label>
              <input
                type='text'
                id='color.interior'
                name='color.interior'
                placeholder='e.g., Black'
                className='form-input'
                value={formData.color.interior}
                onChange={handleChange}
                
              />
            </div>
          </div>
        </div>

        {/* Car Features */}
        <div className='form-section'>
          <h2 className='section-title'>Features</h2>
          {/* Chips-style feature selectors */}
          <div className="features-groups">
              
            {Object.entries(featureOptions).map(([catKey, optionObj]) => {
              const category = catKey.replace('features',''); // e.g., 'SafetyFeatures' -> 'safety'
              const title = category.charAt(0).toUpperCase() + category.slice(1);
              const optionEntries = Object.entries(optionObj);

              return (
                <div key={category} className={`${category}-features group-checkbox`}>
                  <label>{`${title} Features`}</label>
                  <div className="options-container">
                    {optionEntries.map(([code, label], idx) => {
                      const id = `${category}-${label}`;
                      console.log(category);
                      const checked = formData.features[category]?.includes(label);

                      return (
                        <div key={id}>
                          <input
                            type="checkbox"
                            id={id}
                            checked={checked}
                            onChange={(e) => toggleFeature(category, label, e.target.checked)}
                          />
                          <label htmlFor={id}>{code}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Images & Featured */}
        <div className='form-section'>
          <h2 className='section-title'>Media & Highlight</h2>
          <div className='form-grid'>
            <div>
              <label htmlFor='imagesText' className='form-label'>Image URLs (comma separated) *</label>
              <textarea id='imagesText' name='imagesText' rows='2' className='form-textarea' placeholder='https://example.com/one.jpg, https://example.com/two.jpg' value={formData.imagesText} onChange={handleChange}></textarea>
              <input type='file' id='images' name='images' multiple accept='image/*' onChange={handleImageChange} />
            </div>
            <div>
              <label htmlFor='isFeatured' className='form-label'>Featured</label>
              <input type='checkbox' id='isFeatured' name='isFeatured' checked={formData.isFeatured} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='form-section'>
          <h2 className='section-title'>Description</h2>
          <div>
            <label htmlFor='description' className='form-label'>
              Vehicle Description
            </label>
            <textarea
              id='description'
              name='description'
              rows='4'
              placeholder="Describe the vehicle's features, condition, and history..."
              className='form-textarea'
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className='form-actions'>
          <button
            type='submit'
            className='submit-button'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCarPage;
