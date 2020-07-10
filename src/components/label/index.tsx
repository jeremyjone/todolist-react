import React from 'react';
import Chip from "@material-ui/core/Chip";


interface Props {
  className?: string
  name?: string
}

class Label extends React.Component<Props> {
  render() {
    const { name, className } = this.props;
    return (
      <Chip label={name || ""} className={className} size="small" style={{fontSize: "12px"}} />
    )
  }
}

export default Label;
