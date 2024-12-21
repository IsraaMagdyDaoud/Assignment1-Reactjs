import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Buttons/Button";
function TeamMembers() {
  return (
    <div className="container">
      <div className="row">
        <h1>Team Members</h1>
        <div className="col-lg-4">
          <Button
            color="primary"
            icon={faUser}
            text="Show All Members"
            onClick=""
          />
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
