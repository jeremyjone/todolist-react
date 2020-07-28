import React from 'react';


export default function FooterLayout(props: any) {
  return (
    <div style={{ height: "60px", backgroundColor: "green" }}>
      {props.children}
    </div>
  )
}
