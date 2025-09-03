import { useState } from 'react';

type TravelForm = {
  // Step 1: Basic Information
  destination: string;
  purpose: string;
  travelType: string;
  
  // Step 2: Dates and Duration
  startDate: string;
  endDate: string;
  estimatedDuration: string;
  
  // Step 3: Travel Details
  transportationMode: string;
  accommodationType: string;
  estimatedCost: string;
  
  // Step 4: Additional Information
  specialRequirements: string;
  attachments: string;
  notes: string;
  
  // Step 5: Acknowledgement
  acknowledgement: boolean;
};

export default function NewTravel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<TravelForm>({
    destination: '',
    purpose: '',
    travelType: '',
    startDate: '',
    endDate: '',
    estimatedDuration: '',
    transportationMode: '',
    accommodationType: '',
    estimatedCost: '',
    specialRequirements: '',
    attachments: '',
    notes: '',
    acknowledgement: false
  });

  const totalSteps = 5;

  function update<K extends keyof TravelForm>(key: K, value: TravelForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.acknowledgement) {
      alert('Please acknowledge the terms and conditions before submitting.');
      return;
    }
    alert('Travel request submitted successfully!');
  }

  function renderStepIndicator() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: index + 1 <= currentStep ? 'var(--primary)' : 'var(--border)',
                color: index + 1 <= currentStep ? 'white' : 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 14
              }}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: index + 1 < currentStep ? 'var(--primary)' : 'var(--border)',
                  margin: '0 8px'
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Basic Information</h3>
            <label>
              Destination *
              <input
                required
                value={form.destination}
                onChange={(e) => update('destination', e.target.value)}
                placeholder="Enter destination city/country"
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
            <label>
              Purpose of Travel *
              <textarea
                required
                value={form.purpose}
                onChange={(e) => update('purpose', e.target.value)}
                placeholder="Describe the purpose of your travel"
                rows={3}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
            <label>
              Type of Travel *
              <select
                required
                value={form.travelType}
                onChange={(e) => update('travelType', e.target.value)}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              >
                <option value="">Select travel type</option>
                <option value="business">Business</option>
                <option value="conference">Conference</option>
                <option value="training">Training</option>
                <option value="client-meeting">Client Meeting</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
        );

      case 2:
        return (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Dates and Duration</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <label>
                Start Date *
                <input
                  required
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update('startDate', e.target.value)}
                  style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
                />
              </label>
              <label>
                End Date *
                <input
                  required
                  type="date"
                  value={form.endDate}
                  onChange={(e) => update('endDate', e.target.value)}
                  style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
                />
              </label>
            </div>
            <label>
              Estimated Duration (Days)
              <input
                type="number"
                value={form.estimatedDuration}
                onChange={(e) => update('estimatedDuration', e.target.value)}
                placeholder="Enter estimated duration in days"
                min="1"
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Travel Details</h3>
            <label>
              Transportation Mode *
              <select
                required
                value={form.transportationMode}
                onChange={(e) => update('transportationMode', e.target.value)}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              >
                <option value="">Select transportation mode</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Accommodation Type
              <select
                value={form.accommodationType}
                onChange={(e) => update('accommodationType', e.target.value)}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              >
                <option value="">Select accommodation type</option>
                <option value="hotel">Hotel</option>
                <option value="guesthouse">Guesthouse</option>
                <option value="apartment">Apartment</option>
                <option value="company-provided">Company Provided</option>
                <option value="none">No Accommodation Needed</option>
              </select>
            </label>
            <label>
              Estimated Cost
              <input
                type="number"
                value={form.estimatedCost}
                onChange={(e) => update('estimatedCost', e.target.value)}
                placeholder="Enter estimated cost in your currency"
                min="0"
                step="0.01"
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
          </div>
        );

      case 4:
        return (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Additional Information</h3>
            <label>
              Special Requirements
              <textarea
                value={form.specialRequirements}
                onChange={(e) => update('specialRequirements', e.target.value)}
                placeholder="Any special requirements or accessibility needs"
                rows={3}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
            <label>
              Attachments
              <input
                type="file"
                multiple
                onChange={(e) => update('attachments', e.target.files ? Array.from(e.target.files).map(f => f.name).join(', ') : '')}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
            <label>
              Additional Notes
              <textarea
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="Any additional information or comments"
                rows={3}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}
              />
            </label>
          </div>
        );

      case 5:
        return (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Review and Acknowledgement</h3>
            
            <div style={{ 
              backgroundColor: 'var(--background-secondary)', 
              padding: 16, 
              borderRadius: 8, 
              border: '1px solid var(--border)' 
            }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Travel Request Summary</h4>
              <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                <div><strong>Destination:</strong> {form.destination}</div>
                <div><strong>Purpose:</strong> {form.purpose}</div>
                <div><strong>Travel Type:</strong> {form.travelType}</div>
                <div><strong>Dates:</strong> {form.startDate} to {form.endDate}</div>
                <div><strong>Transportation:</strong> {form.transportationMode}</div>
                <div><strong>Estimated Cost:</strong> {form.estimatedCost ? `$${form.estimatedCost}` : 'Not specified'}</div>
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'var(--background-secondary)', 
              padding: 16, 
              borderRadius: 8, 
              border: '1px solid var(--border)' 
            }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Terms and Conditions</h4>
              <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
                By submitting this travel request, you acknowledge that:
                <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                  <li>All information provided is accurate and complete</li>
                  <li>You will comply with company travel policies</li>
                  <li>Expenses will be submitted within 30 days of travel completion</li>
                  <li>Any changes to travel plans must be communicated immediately</li>
                </ul>
              </div>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.acknowledgement}
                  onChange={(e) => update('acknowledgement', e.target.checked)}
                  required
                  style={{ width: 18, height: 18 }}
                />
                <span style={{ fontSize: 14 }}>
                  I acknowledge and agree to the terms and conditions above *
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div>
      <div className="h1">New Travel Request</div>
      
      {renderStepIndicator()}
      
      <form className="card full" onSubmit={submit} style={{ display: 'grid', gap: 20 }}>
        {renderStepContent()}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: 20,
          borderTop: '1px solid var(--border)'
        }}>
          <div>
            {currentStep > 1 && (
              <button 
                type="button" 
                className="btn secondary" 
                onClick={prevStep}
                style={{ marginRight: 12 }}
              >
                Previous
              </button>
            )}
          </div>
          
          <div>
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                className="btn" 
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn" 
                type="submit"
                disabled={!form.acknowledgement}
              >
                Submit Travel Request
              </button>
            )}
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          fontSize: 14, 
          color: 'var(--text-secondary)',
          marginTop: 8
        }}>
          Step {currentStep} of {totalSteps}
        </div>
      </form>
    </div>
  );
}

