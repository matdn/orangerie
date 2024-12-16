import { nthNumber } from '../../../../helpers/common.helpers.ts';
import { useTranslation } from 'react-i18next';

const Rank = ({userRank, teamRank, totalPlayers, totalTeams}) => {
  const { t } = useTranslation();

  return t('Global.YourRanking', 'Your ranking')
    + ' : '
    + (userRank ? nthNumber(userRank) : nthNumber(teamRank))
    + ' '
    +  t('Global.OutOf', 'out of')
    +  ' '
    + (userRank ? totalPlayers : totalTeams) || 'N/A';
}

export default Rank;
