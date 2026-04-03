import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/admin/donations')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Platform Ledger</h1>
        <p className="text-gray-500 mt-2">Real-time M-Pesa transaction history across all charities.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 animate-pulse font-medium">Loading ledger data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-5">Date</th>
                  <th className="p-5">Charity</th>
                  <th className="p-5">Donor Phone</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Receipt No.</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {donations.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 text-gray-500 font-medium">{tx.date}</td>
                    <td className="p-5 font-bold text-gray-900">{tx.charity}</td>
                    <td className="p-5 font-mono text-gray-600">{tx.phone}</td>
                    <td className="p-5 font-bold text-emerald-600">KES {tx.amount.toLocaleString()}</td>
                    <td className="p-5 font-mono text-gray-500">{tx.receipt}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5
                        ${tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                          tx.status === 'Failed' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {tx.status === 'Completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                        {tx.status === 'Failed' && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                        {tx.status === 'Pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>}
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {donations.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-500">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}