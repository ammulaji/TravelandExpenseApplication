import { useState, useEffect } from 'react';

type ExpenseForm = {
  // Basic Information
  expenseType: 'travel' | 'other';
  date: string;
  amount: string;
  currency: string;
  
  // Travel Linking (when expenseType is 'travel')
  linkedTravelRequest: string;
  
  // Categorization
  category: string;
  subcategory: string;
  
  // Details
  description: string;
  vendor: string;
  location: string;
  
  // Receipt and Approval
  receiptFile: string;
  approvalRequired: boolean;
  approvalLevel: 'auto' | 'manager' | 'financeTeam' | 'none';
  approvalReason: string;
  notes: string;
};

// Mock travel requests data - in real app, this would come from API/database
const mockTravelRequests = [
  { id: 'TR001', destination: 'New York', purpose: 'Client Meeting', dates: '2024-01-15 to 2024-01-18' },
  { id: 'TR002', destination: 'London', purpose: 'Conference', dates: '2024-02-10 to 2024-02-15' },
  { id: 'TR003', destination: 'Tokyo', purpose: 'Training', dates: '2024-03-05 to 2024-03-10' },
];

// Mock existing expenses for travel requests - in real app, this would come from API/database
const mockTravelExpenses: any = {
  'TR001': [
    { category: 'Transportation', amount: 450, date: '2024-01-15' },
    { category: 'Accommodation', amount: 180, date: '2024-01-15' }
  ],
  'TR002': [
    { category: 'Transportation', amount: 1200, date: '2024-02-10' },
    { category: 'Accommodation', amount: 800, date: '2024-02-10' }
  ],
  'TR003': []
};

// Expense limits configuration - in real app, this would come from company policy API
const EXPENSE_LIMITS: any = {
  travel: {
    'Transportation': { autoApproval: 500, managerApproval: 1000, financeTeamApproval: 2000 },
    'Accommodation': { autoApproval: 200, managerApproval: 500, financeTeamApproval: 1000 },
    'Meals': { autoApproval: 50, managerApproval: 100, financeTeamApproval: 200 },
    'Business': { autoApproval: 300, managerApproval: 750, financeTeamApproval: 1500 },
    'Other Travel': { autoApproval: 100, managerApproval: 250, financeTeamApproval: 500 }
  },
  other: {
    'Office': { autoApproval: 100, managerApproval: 250, financeTeamApproval: 500 },
    'Professional': { autoApproval: 200, managerApproval: 500, financeTeamApproval: 1000 },
    'Marketing': { autoApproval: 150, managerApproval: 400, financeTeamApproval: 800 },
    'Utilities': { autoApproval: 50, managerApproval: 150, financeTeamApproval: 300 },
    'Maintenance': { autoApproval: 100, managerApproval: 300, financeTeamApproval: 600 }
  }
};

// Expense categories for different types
const expenseCategories: Record<string, Record<string, string[]>> = {
  travel: {
    'Transportation': ['Flight', 'Train', 'Bus', 'Taxi', 'Rental Car', 'Parking', 'Tolls'],
    'Accommodation': ['Hotel', 'Guesthouse', 'Apartment', 'Resort'],
    'Meals': ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Coffee/Tea'],
    'Business': ['Conference Fees', 'Meeting Expenses', 'Business Supplies'],
    'Other Travel': ['Visa Fees', 'Travel Insurance', 'Baggage Fees', 'Currency Exchange']
  },
  other: {
    'Office': ['Office Supplies', 'Equipment', 'Software Licenses', 'Printing'],
    'Professional': ['Training Courses', 'Certifications', 'Professional Memberships'],
    'Marketing': ['Advertising', 'Promotional Materials', 'Event Costs'],
    'Utilities': ['Internet', 'Phone', 'Electricity', 'Water'],
    'Maintenance': ['Equipment Repair', 'Office Maintenance', 'Cleaning Services']
  }
};

export default function NewExpense() {
  const [form, setForm] = useState<ExpenseForm>({
    expenseType: 'other',
    date: '',
    amount: '',
    currency: 'USD',
    linkedTravelRequest: '',
    category: '',
    subcategory: '',
    description: '',
    vendor: '',
    location: '',
    receiptFile: '',
    approvalRequired: false,
    approvalLevel: 'none',
    approvalReason: '',
    notes: ''
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [approvalInfo, setApprovalInfo] = useState<{
    required: boolean;
    level: 'auto' | 'manager' | 'financeTeam' | 'none';
    reason: string;
    limit: number;
  }>({
    required: false,
    level: 'none',
    reason: '',
    limit: 0
  });

  const [travelExpenseSummary, setTravelExpenseSummary] = useState<{
    totalExpenses: number;
    expensesByCategory: Record<string, number>;
    nextApprovalLevel: string;
  }>({
    totalExpenses: 0,
    expensesByCategory: {},
    nextApprovalLevel: ''
  });

  // Calculate approval requirements when amount, category, or travel request changes
  useEffect(() => {
    if (form.amount && form.category && form.expenseType) {
      const amount = parseFloat(form.amount);
      const limits = EXPENSE_LIMITS[form.expenseType][form.category];
      
      if (limits) {
        let level: 'auto' | 'manager' | 'financeTeam' | 'none' = 'none';
        let reason = '';
        let limit = 0;

        if (amount > limits.financeTeamApproval) {
          level = 'financeTeam';
          reason = `Amount $${amount} exceeds finance team approval threshold of $${limits.financeTeamApproval}`;
          limit = limits.financeTeamApproval;
        } else if (amount > limits.managerApproval) {
          level = 'manager';
          reason = `Amount $${amount} exceeds manager approval threshold of $${limits.managerApproval}`;
          limit = limits.managerApproval;
        } else if (amount > limits.autoApproval) {
          level = 'manager';
          reason = `Amount $${amount} exceeds auto-approval limit of $${limits.autoApproval}`;
          limit = limits.autoApproval;
        } else {
          level = 'auto';
          reason = `Amount $${amount} is within auto-approval limit of $${limits.autoApproval}`;
          limit = limits.autoApproval;
        }

        setApprovalInfo({
          required: level !== 'auto',
          level,
          reason,
          limit
        });

        // Update form approval fields
        setForm(prev => ({
          ...prev,
          approvalRequired: level !== 'auto',
          approvalLevel: level,
          approvalReason: reason
        }));
      }
    }
  }, [form.amount, form.category, form.expenseType]);

  // Calculate travel expense summary when travel request changes
  useEffect(() => {
    if (form.linkedTravelRequest && form.linkedTravelRequest !== '') {
      const expenses = mockTravelExpenses[form.linkedTravelRequest] || [];
      const total = expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0);
      const byCategory = expenses.reduce((acc: Record<string, number>, exp: any) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {} as Record<string, number>);

      setTravelExpenseSummary({
        totalExpenses: total,
        expensesByCategory: byCategory,
        nextApprovalLevel: total > 1000 ? 'Finance Team' : total > 500 ? 'Manager' : 'Auto'
      });
    } else {
      setTravelExpenseSummary({
        totalExpenses: 0,
        expensesByCategory: {},
        nextApprovalLevel: ''
      });
    }
  }, [form.linkedTravelRequest]);

  function update<K extends keyof ExpenseForm>(key: K, value: ExpenseForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    
    // Reset subcategory when category changes
    if (key === 'category') {
      setSelectedCategory(value as string);
      update('subcategory', '');
    }
    
    // Reset travel-related fields when switching expense types
    if (key === 'expenseType') {
      update('linkedTravelRequest', '');
      update('category', '');
      update('subcategory', '');
      setSelectedCategory('');
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    
    if (form.expenseType === 'travel' && !form.linkedTravelRequest) {
      alert('Please select a linked travel request for travel expenses.');
      return;
    }
    
    if (!form.category || !form.subcategory) {
      alert('Please select both category and subcategory.');
      return;
    }
    
    if (!form.receiptFile) {
      alert('Please upload a receipt.');
      return;
    }

    if (form.approvalRequired && !form.approvalReason) {
      alert('Please provide approval reason for expenses requiring approval.');
      return;
    }
    
    alert(`Expense submitted successfully! ${form.approvalRequired ? `Approval required from ${form.approvalLevel}.` : 'Auto-approved.'}`);
  }

  function renderExpenseTypeSection() {
    return (
      <div style={{ 
        backgroundColor: 'var(--background-secondary)', 
        padding: 20, 
        borderRadius: 8, 
        border: '1px solid var(--border)',
        marginBottom: 20
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Expense Type</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="radio"
              name="expenseType"
              value="travel"
              checked={form.expenseType === 'travel'}
              onChange={(e) => update('expenseType', e.target.value as 'travel' | 'other')}
            />
            <span>Travel-Related Expense</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="radio"
              name="expenseType"
              value="other"
              checked={form.expenseType === 'other'}
              onChange={(e) => update('expenseType', e.target.value as 'travel' | 'other')}
            />
            <span>Other Expense</span>
          </label>
        </div>
        
        {form.expenseType === 'travel' && (
          <div style={{ marginTop: 16 }}>
            <label>
              Link to Travel Request *
              <select
                required
                value={form.linkedTravelRequest}
                onChange={(e) => update('linkedTravelRequest', e.target.value)}
                style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
              >
                <option value="">Select a travel request</option>
                {mockTravelRequests.map(travel => (
                  <option key={travel.id} value={travel.id}>
                    {travel.id} - {travel.destination} ({travel.purpose}) - {travel.dates}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    );
  }

  function renderTravelExpenseSummary() {
    if (!form.linkedTravelRequest || form.expenseType !== 'travel') return null;

    return (
      <div style={{ 
        backgroundColor: 'var(--background-secondary)', 
        padding: 16, 
        borderRadius: 8, 
        border: '1px solid var(--border)',
        marginBottom: 20
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary)' }}>Travel Expense Summary</h4>
        <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
          <div><strong>Total Expenses:</strong> ${travelExpenseSummary.totalExpenses}</div>
          <div><strong>Next Approval Level:</strong> {travelExpenseSummary.nextApprovalLevel}</div>
          {Object.keys(travelExpenseSummary.expensesByCategory).length > 0 && (
            <div>
              <strong>By Category:</strong>
              <ul style={{ margin: '4px 0 0 20px', padding: 0 }}>
                {Object.entries(travelExpenseSummary.expensesByCategory).map(([category, amount]) => (
                  <li key={category}>{category}: ${amount}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderBasicInformationSection() {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Basic Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <label>
            Date *
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            />
          </label>
          <label>
            Amount *
            <input
              required
              type="number"
              value={form.amount}
              onChange={(e) => update('amount', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            />
          </label>
          <label>
            Currency
            <select
              value={form.currency}
              onChange={(e) => update('currency', e.target.value)}
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </label>
        </div>
      </div>
    );
  }

  function renderApprovalStatusSection() {
    if (!form.amount || !form.category) return null;

    const getApprovalColor = (level: string) => {
      switch (level) {
        case 'auto': return '#28a745';
        case 'manager': return '#ffc107';
        case 'financeTeam': return '#dc3545';
        default: return 'var(--text)';
      }
    };

    return (
      <div style={{ 
        backgroundColor: approvalInfo.required ? '#fff3cd' : '#d4edda',
        padding: 16, 
        borderRadius: 8, 
        border: `1px solid ${approvalInfo.required ? '#ffeaa7' : '#c3e6cb'}`,
        marginBottom: 20
      }}>
        <h4 style={{ 
          margin: '0 0 12px 0', 
          color: getApprovalColor(approvalInfo.level) 
        }}>
          Approval Status: {approvalInfo.level.toUpperCase()}
        </h4>
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>
          <div><strong>Status:</strong> {approvalInfo.required ? 'Approval Required' : 'Auto-Approved'}</div>
          <div><strong>Reason:</strong> {approvalInfo.reason}</div>
          {approvalInfo.required && (
            <div style={{ marginTop: 8, padding: 8, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 4 }}>
              <strong>Next Steps:</strong> This expense will be routed to {approvalInfo.level} for approval.
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderCategorizationSection() {
    const categories = expenseCategories[form.expenseType];
    
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Categorization</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label>
            Category *
            <select
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            >
              <option value="">Select category</option>
              {Object.keys(categories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label>
            Subcategory *
            <select
              required
              value={form.subcategory}
              onChange={(e) => update('subcategory', e.target.value)}
              disabled={!form.category}
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            >
              <option value="">Select subcategory</option>
              {form.category && categories[form.category]?.map((subcat: string) => (
                <option key={subcat} value={subcat}>{subcat}</option>
              ))}
            </select>
          </label>
        </div>
        
        {form.category && (
          <div style={{ 
            backgroundColor: 'var(--background-secondary)', 
            padding: 12, 
            borderRadius: 6, 
            border: '1px solid var(--border)',
            fontSize: 12
          }}>
            <strong>Expense Limits for {form.category}:</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
              <div><strong>Auto:</strong> ${EXPENSE_LIMITS[form.expenseType][form.category]?.autoApproval}</div>
              <div><strong>Manager:</strong> ${EXPENSE_LIMITS[form.expenseType][form.category]?.managerApproval}</div>
              <div><strong>Finance Team:</strong> ${EXPENSE_LIMITS[form.expenseType][form.category]?.financeTeamApproval}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderDetailsSection() {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Expense Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <label>
            Description *
            <input
              required
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Brief description of the expense"
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            />
          </label>
          <label>
            Vendor/Provider
            <input
              value={form.vendor}
              onChange={(e) => update('vendor', e.target.value)}
              placeholder="Company or vendor name"
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            />
          </label>
        </div>
        <label>
          Location
          <input
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Where the expense occurred"
            style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
          />
        </label>
      </div>
    );
  }

  function renderReceiptSection() {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)' }}>Receipt & Approval</h3>
        <label>
          Receipt Upload *
          <input
            required
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => update('receiptFile', e.target.files ? e.target.files[0]?.name || '' : '')}
            style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
          />
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            Accepted formats: JPG, PNG, PDF (Max 10MB)
          </div>
        </label>
        
        {form.approvalRequired && (
          <label>
            Approval Reason *
            <textarea
              required
              value={form.approvalReason}
              onChange={(e) => update('approvalReason', e.target.value)}
              placeholder="Explain why this expense requires approval"
              rows={3}
              style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
            />
          </label>
        )}
        
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.approvalRequired}
            disabled
            style={{ width: 18, height: 18 }}
          />
          <span>Approval required: {form.approvalRequired ? 'Yes' : 'No'} ({form.approvalLevel})</span>
        </label>
        
        <label>
          Additional Notes
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Any additional information about this expense"
            rows={3}
            style={{ width: '100%', padding: 12, border: '1px solid var(--border)', borderRadius: 8, marginTop: 8 }}
          />
        </label>
      </div>
    );
  }

  return (
    <div>
      <div className="h1">Submit Expense</div>
      
      <form className="card full" onSubmit={submit} style={{ display: 'grid', gap: 20 }}>
        {renderExpenseTypeSection()}
        {renderTravelExpenseSummary()}
        {renderBasicInformationSection()}
        {renderApprovalStatusSection()}
        {renderCategorizationSection()}
        {renderDetailsSection()}
        {renderReceiptSection()}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: 20,
          borderTop: '1px solid var(--border)'
        }}>
          <div>
            <button className="btn secondary" type="reset">
              Reset Form
            </button>
          </div>
          
          <div>
            <button className="btn" type="submit">
              Submit Expense
            </button>
          </div>
        </div>
        
        {form.expenseType === 'travel' && form.linkedTravelRequest && (
          <div style={{ 
            backgroundColor: 'var(--background-secondary)', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid var(--border)',
            fontSize: 14
          }}>
            <strong>Linked to Travel Request:</strong> {form.linkedTravelRequest}
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>
              This expense will be automatically associated with your travel request for approval and reimbursement.
            </span>
          </div>
        )}
      </form>
    </div>
  );
}

