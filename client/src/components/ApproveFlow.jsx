import { useState } from "react";
import ParentRequestForm from "./ParentRequestForm";
import ChildApproval from "./ChildApproval";
import AdminApproval from "./AdminApproval";

const ParentChildLinkingFlow = () => {
  const [requests, setRequests] = useState([]);
  const [childApprovedRequests, setChildApprovedRequests] = useState([]);

  const handleParentRequest = (data) => {
    const newRequest = { ...data, id: Date.now(), status: "pending" };
    setRequests([...requests, newRequest]);
  };

  const handleChildApprove = (requestId) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status: "child-approved" } : request
    );
    setRequests(updatedRequests);
    setChildApprovedRequests(updatedRequests.filter((req) => req.status === "child-approved"));
  };

  const handleAdminApprove = (requestId) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status: "admin-approved" } : request
    );
    setRequests(updatedRequests);
    alert("Parent request approved! Parent can now access child details.");
  };

  return (
    <div className="space-y-8">
      <ParentRequestForm onSubmit={handleParentRequest} />
      <ChildApproval
        requests={requests.filter((req) => req.status === "pending")}
        onApprove={handleChildApprove}
      />
      <AdminApproval
        requests={childApprovedRequests}
        onApprove={handleAdminApprove}
      />
    </div>
  );
};

export default ParentChildLinkingFlow;