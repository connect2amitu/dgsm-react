import React from 'react'
import DGSMJivani from '../../components/Jivani';
import { DADA_BHAGWAN, GEETA_BHAGWAN, SHAYAM_BHAGWAN, MEERA_BHAGWAN } from '../../assets/jivani';


class Jivani extends React.Component {
  render() {
    var data = null;
    switch (this.props.match.params[0]) {
      case 'dada-bhagwan':
        data = DADA_BHAGWAN;
        break;
      case 'geeta-bhagwan':
        data = GEETA_BHAGWAN;
        break;
      case 'shyam-bhagwan':
        data = SHAYAM_BHAGWAN;

        break;
      case 'meera-bhagwan':
        data = MEERA_BHAGWAN;
        break;
      default:
        break;
    }
    return (
      <DGSMJivani data={data} />
    );
  }
}

export default Jivani

