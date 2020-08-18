import React from 'react'
import DGSMJivani from '../../components/Jivani';
import { DADA_BHAGWAN, GEETA_BHAGWAN, SHAYAM_BHAGWAN, MEERA_BHAGWAN } from '../../assets/jivani';
import Meta from '../../components/SEO';
import { MAIN_CATEGORY } from '../../shared/constants';

class Jivani extends React.Component {
  render() {
    var data = null;
    var _data = MAIN_CATEGORY.find(main => main.slug === this.props.match.params[0]);
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
      <>
        <Meta title={`Jivani | ${_data.name || ""} | DGSM`} description={`Divine ${_data.name || ""} Jivani`} />
        <DGSMJivani data={data} />
      </>
    );
  }

}

export default Jivani

