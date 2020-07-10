import React from 'react';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

interface Props {
  name: string
  size?: number
  className?: string
}

class CustomIcon extends React.Component<Props> {
  render() {
    const { name, className } = this.props;
    let { size } = this.props;
    size = !size || size < 10 ? 10 : size;

    switch (name) {
      case "alarm":
        return <AccessAlarmIcon fontSize="small" style={{ fontSize: size }} className={className} />
      case "cyclic":
        return <AutorenewIcon fontSize="small" style={{ fontSize: size }} className={className} />
      case "label":
        return <LocalOfferIcon fontSize="small" style={{ fontSize: size }} className={className} />
    }
  }
}

export default CustomIcon;
