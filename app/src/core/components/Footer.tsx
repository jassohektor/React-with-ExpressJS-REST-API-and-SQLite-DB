import React from "react";
import { Context } from "../contexts/Context";

export function Footer() {
    const { email } = React.useContext(Context);

    return <div className="footer">
        <div style={{ marginTop: "-10px" }}>
          [ {email} ] © 2024
        </div>
      </div>
  }