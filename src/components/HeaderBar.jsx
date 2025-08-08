import React from "react";

const headerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "80px",
  opacity: 0.8,
  background: "#ffffffff",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  paddingLeft: 32,
  zIndex: 5,
};

const textStyle = {
  color: "#48502F",
  fontSize: 32,
  fontFamily: "Newsreader, serif",
  fontWeight: 500,
  lineHeight: "32px",
  wordWrap: "break-word",
};

export default function HeaderBar() {
  return (
    <div style={headerStyle}>
      <span style={textStyle}>HealthiMart</span>
    </div>
  );
}
