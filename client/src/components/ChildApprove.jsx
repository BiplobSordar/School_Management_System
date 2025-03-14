const ChildApproval = ({ requests, onApprove }) => {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Pending Parent Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-600">No pending requests.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-800"><strong>Parent Name:</strong> {request.parentName}</p>
              <p className="text-gray-800"><strong>Parent Email:</strong> {request.parentEmail}</p>
              <p className="text-gray-800"><strong>Child Admission Number:</strong> {request.childAdmissionNumber}</p>
              <button
                onClick={() => onApprove(request.id)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Approve Request
              </button>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default ChildApproval;