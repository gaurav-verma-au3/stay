import React from "react";
import Rooms from "./Rooms";
import Tenant from "./Tenant";
import Payments from "./Payments";
import Tenants from "./Tenants";

const RoomsFrame = () => {
  return (
    <div className="p-3 bg-info">
      <Rooms />
    </div>
  );
};

const TenantsFrame = () => {
  return <div className="p-3 bg-info">
       <Tenants/>
     </div>

};

const PaymentsFrame = () => {
  return (
    <div className="p-3 bg-info">
      <Payments />
    </div>
  );
};

const TenantFrame = () => {
  return (
    <div className="p-3 bg-info">
      <Tenant />
    </div>
  );
};

export { RoomsFrame, TenantsFrame, TenantFrame, PaymentsFrame };
